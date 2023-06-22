/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the Source EULA. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { Event, Emitter } from 'vs/base/common/event';
import { Registry } from 'vs/platform/registry/common/platform';
import { URI } from 'vs/base/common/uri';
import { RawContextKey } from 'vs/platform/contextkey/common/contextkey';
import { createDecorator } from 'vs/platform/instantiation/common/instantiation';
import { IFileService, whenProviderRegistered } from 'vs/platform/files/common/files';
import { ILogService } from 'vs/platform/log/common/log';
import { CancellationToken } from 'vs/base/common/cancellation';
import { CancellationError, getErrorMessage, isCancellationError } from 'vs/base/common/errors';
import { CancelablePromise, createCancelablePromise, timeout } from 'vs/base/common/async';

/**
 * Mime type used by the output editor.
 */
export const OUTPUT_MIME = 'text/x-code-output';

/**
 * Output resource scheme.
 */
export const OUTPUT_SCHEME = 'output';

/**
 * Id used by the output editor.
 */
export const OUTPUT_MODE_ID = 'Log';

/**
 * Mime type used by the log output editor.
 */
export const LOG_MIME = 'text/x-code-log-output';

/**
 * Log resource scheme.
 */
export const LOG_SCHEME = 'log';

/**
 * Id used by the log output editor.
 */
export const LOG_MODE_ID = 'log';

/**
 * Output view id
 */
export const OUTPUT_VIEW_ID = 'workbench.panel.output';

export const OUTPUT_SERVICE_ID = 'outputService';

export const MAX_OUTPUT_LENGTH = 10000 /* Max. number of output lines to show in output */ * 100 /* Guestimated chars per line */;

export const CONTEXT_IN_OUTPUT = new RawContextKey<boolean>('inOutput', false);

export const CONTEXT_ACTIVE_LOG_OUTPUT = new RawContextKey<boolean>('activeLogOutput', false);

export const CONTEXT_OUTPUT_SCROLL_LOCK = new RawContextKey<boolean>(`outputView.scrollLock`, false);

export const IOutputService = createDecorator<IOutputService>(OUTPUT_SERVICE_ID);

/**
 * The output service to manage output from the various processes running.
 */
export interface IOutputService {
	readonly _serviceBrand: undefined;

	/**
	 * Given the channel id returns the output channel instance.
	 * Channel should be first registered via OutputChannelRegistry.
	 */
	getChannel(id: string): IOutputChannel | undefined;

	/**
	 * Given the channel id returns the registered output channel descriptor.
	 */
	getChannelDescriptor(id: string): IOutputChannelDescriptor | undefined;

	/**
	 * Returns an array of all known output channels descriptors.
	 */
	getChannelDescriptors(): IOutputChannelDescriptor[];

	/**
	 * Returns the currently active channel.
	 * Only one channel can be active at a given moment.
	 */
	getActiveChannel(): IOutputChannel | undefined;

	/**
	 * Show the channel with the passed id.
	 */
	showChannel(id: string, preserveFocus?: boolean): Promise<void>;

	/**
	 * Allows to register on active output channel change.
	 */
	onActiveOutputChannel: Event<string>;
}

export enum OutputChannelUpdateMode {
	Append = 1,
	Replace,
	Clear
}

export interface IOutputChannel {

	/**
	 * Identifier of the output channel.
	 */
	id: string;

	/**
	 * Label of the output channel to be displayed to the user.
	 */
	label: string;

	/**
	 * URI of the output channel.
	 */
	uri: URI;

	/**
	 * Appends output to the channel.
	 */
	append(output: string): void;

	/**
	 * Clears all received output for this channel.
	 */
	clear(): void;

	/**
	 * Replaces the content of the channel with given output
	 */
	replace(output: string): void;

	/**
	 * Update the channel.
	 */
	update(mode: OutputChannelUpdateMode.Append): void;
	update(mode: OutputChannelUpdateMode, till: number): void;

	/**
	 * Disposes the output channel.
	 */
	dispose(): void;
}

export const Extensions = {
	OutputChannels: 'workbench.contributions.outputChannels'
};

export interface IOutputChannelDescriptor {
	id: string;
	label: string;
	log: boolean;
	languageId?: string;
	file?: URI;
}

export interface IFileOutputChannelDescriptor extends IOutputChannelDescriptor {
	file: URI;
}

export interface IOutputChannelRegistry {

	readonly onDidRegisterChannel: Event<string>;
	readonly onDidRemoveChannel: Event<string>;

	/**
	 * Make an output channel known to the output world.
	 */
	registerChannel(descriptor: IOutputChannelDescriptor): void;

	/**
	 * Returns the list of channels known to the output world.
	 */
	getChannels(): IOutputChannelDescriptor[];

	/**
	 * Returns the channel with the passed id.
	 */
	getChannel(id: string): IOutputChannelDescriptor | undefined;

	/**
	 * Remove the output channel with the passed id.
	 */
	removeChannel(id: string): void;
}

class OutputChannelRegistry implements IOutputChannelRegistry {
	private channels = new Map<string, IOutputChannelDescriptor>();

	private readonly _onDidRegisterChannel = new Emitter<string>();
	readonly onDidRegisterChannel: Event<string> = this._onDidRegisterChannel.event;

	private readonly _onDidRemoveChannel = new Emitter<string>();
	readonly onDidRemoveChannel: Event<string> = this._onDidRemoveChannel.event;

	public registerChannel(descriptor: IOutputChannelDescriptor): void {
		if (!this.channels.has(descriptor.id)) {
			this.channels.set(descriptor.id, descriptor);
			this._onDidRegisterChannel.fire(descriptor.id);
		}
	}

	public getChannels(): IOutputChannelDescriptor[] {
		const result: IOutputChannelDescriptor[] = [];
		this.channels.forEach(value => result.push(value));
		return result;
	}

	public getChannel(id: string): IOutputChannelDescriptor | undefined {
		return this.channels.get(id);
	}

	public removeChannel(id: string): void {
		this.channels.delete(id);
		this._onDidRemoveChannel.fire(id);
	}
}

Registry.add(Extensions.OutputChannels, new OutputChannelRegistry());

export function registerLogChannel(id: string, label: string, file: URI, fileService: IFileService, logService: ILogService): CancelablePromise<void> {
	return createCancelablePromise(async token => {
		await whenProviderRegistered(file, fileService);
		const outputChannelRegistry = Registry.as<IOutputChannelRegistry>(Extensions.OutputChannels);
		try {
			await whenFileExists(file, 1, fileService, logService, token);
			outputChannelRegistry.registerChannel({ id, label, file, log: true });
		} catch (error) {
			if (!isCancellationError(error)) {
				logService.error('Error while registering log channel', file.toString(), getErrorMessage(error));
			}
		}
	});
}

async function whenFileExists(file: URI, trial: number, fileService: IFileService, logService: ILogService, token: CancellationToken): Promise<void> {
	const exists = await fileService.exists(file);
	if (exists) {
		return;
	}
	if (token.isCancellationRequested) {
		throw new CancellationError();
	}
	if (trial > 10) {
		throw new Error(`Timed out while waiting for file to be created`);
	}
	logService.debug(`[Registering Log Channel] File does not exist. Waiting for 1s to retry.`, file.toString());
	await timeout(1000, token);
	await whenFileExists(file, trial + 1, fileService, logService, token);
}
