/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the Source EULA. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as vscode from 'vscode';
import * as azdata from 'azdata';
import { AppContext } from '../../appContext';
import * as nls from 'vscode-nls';
const localize = nls.loadMessageBundle();

import { TreeNode } from '../treeNode';
import { AzureResourceAccountTreeNode } from './accountTreeNode';
import { AzureResourceAccountNotSignedInTreeNode } from './accountNotSignedInTreeNode';
import { AzureResourceMessageTreeNode } from '../messageTreeNode';
import { AzureResourceContainerTreeNodeBase } from './baseTreeNodes';
import { AzureResourceErrorMessageUtil, equals, filterAccounts } from '../utils';
import { IAzureResourceTreeChangeHandler } from './treeChangeHandler';
import { AzureAccount } from 'azurecore';

export class AzureResourceTreeProvider implements vscode.TreeDataProvider<TreeNode>, IAzureResourceTreeChangeHandler {
	public isSystemInitialized: boolean = false;

	private accounts: AzureAccount[] = [];
	private _onDidChangeTreeData = new vscode.EventEmitter<TreeNode | undefined>();
	private loadingAccountsPromise: Promise<void> | undefined;

	public constructor(private readonly appContext: AppContext,
		private readonly authLibrary: string) {
		azdata.accounts.onDidChangeAccounts(async (e: azdata.DidChangeAccountsParams) => {
			// This event sends it per provider, we need to make sure we get all the azure related accounts
			let accounts = filterAccounts(await azdata.accounts.getAllAccounts(), authLibrary);
			accounts = accounts.filter(a => a.key.providerId.startsWith('azure'));
			// the onDidChangeAccounts event will trigger in many cases where the accounts didn't actually change
			// the notifyNodeChanged event triggers a refresh which triggers a getChildren which can trigger this callback
			// this below check short-circuits the infinite callback loop
			this.setSystemInitialized();
			if (!equals(accounts, this.accounts)) {
				this.accounts = accounts;
				this.notifyNodeChanged(undefined);
			}
		});
	}

	public async getChildren(element?: TreeNode): Promise<TreeNode[]> {
		if (element) {
			return element.getChildren();
		}

		if (!this.isSystemInitialized) {
			if (!this.loadingAccountsPromise) {
				this.loadingAccountsPromise = this.loadAccounts();
			}
			return [AzureResourceMessageTreeNode.create(localize('azure.resource.tree.treeProvider.loadingLabel', "Loading ..."), undefined)];
		}

		try {
			if (this.accounts) {
				if (this.accounts.length === 0) {
					return [new AzureResourceAccountNotSignedInTreeNode()];
				} else {
					this.accounts = filterAccounts(this.accounts, this.authLibrary);
					return this.accounts.map((account) => new AzureResourceAccountTreeNode(account, this.appContext, this));
				}
			} else {
				return [AzureResourceMessageTreeNode.create(localize('azure.resource.tree.treeProvider.loadingLabel', "Loading ..."), undefined)];
			}
		} catch (error) {
			return [AzureResourceMessageTreeNode.create(AzureResourceErrorMessageUtil.getErrorMessage(error), undefined)];
		}
	}

	private async loadAccounts(): Promise<void> {
		try {
			let accounts = await azdata.accounts.getAllAccounts();
			if (accounts) {
				this.accounts = filterAccounts(accounts, this.authLibrary);
			}
			// System has been initialized
			this.setSystemInitialized();
			this._onDidChangeTreeData.fire(undefined);
		} catch (err) {
			// Skip for now, we can assume that the accounts changed event will eventually notify instead
			this.isSystemInitialized = false;
		}
	}

	private setSystemInitialized(): void {
		this.isSystemInitialized = true;
		this.loadingAccountsPromise = undefined;
	}

	public get onDidChangeTreeData(): vscode.Event<TreeNode | undefined> {
		return this._onDidChangeTreeData.event;
	}

	public notifyNodeChanged(node: TreeNode | undefined): void {
		this._onDidChangeTreeData.fire(node);
	}

	public async refresh(node: TreeNode | undefined, isClearingCache: boolean): Promise<void> {
		if (isClearingCache) {
			if ((node instanceof AzureResourceContainerTreeNodeBase)) {
				node.clearCache();
			}
		}
		this._onDidChangeTreeData.fire(node);
	}

	public getTreeItem(element: TreeNode): vscode.TreeItem | Thenable<vscode.TreeItem> {
		return element.getTreeItem();
	}
}
