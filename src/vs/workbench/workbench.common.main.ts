/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the Source EULA. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

//#region --- editor/workbench core

import 'vs/editor/editor.all';

import 'vs/workbench/api/browser/extensionHost.contribution';
import 'sql/workbench/api/browser/extensionHost.contribution'; // {{SQL CARBON EDIT}} @anthonydresser add our extension contributions
import 'vs/workbench/browser/workbench.contribution';

//#endregion


//#region --- workbench actions

import 'vs/workbench/browser/actions/textInputActions';
import 'vs/workbench/browser/actions/developerActions';
import 'vs/workbench/browser/actions/helpActions';
import 'vs/workbench/browser/actions/layoutActions';
import 'vs/workbench/browser/actions/listCommands';
import 'vs/workbench/browser/actions/navigationActions';
import 'vs/workbench/browser/actions/windowActions';
import 'vs/workbench/browser/actions/workspaceActions';
import 'vs/workbench/browser/actions/workspaceCommands';
import 'vs/workbench/browser/actions/quickAccessActions';

//#endregion


//#region --- API Extension Points

import 'vs/workbench/services/actions/common/menusExtensionPoint';
import 'vs/workbench/api/common/configurationExtensionPoint';
import 'vs/workbench/api/browser/viewsExtensionPoint';

//#endregion


//#region --- workbench parts

import 'vs/workbench/browser/parts/editor/editor.contribution';
import 'vs/workbench/browser/parts/editor/editorPart';
import 'vs/workbench/browser/parts/paneCompositePart';
import 'vs/workbench/browser/parts/banner/bannerPart';
import 'vs/workbench/browser/parts/statusbar/statusbarPart';
import 'vs/workbench/browser/parts/views/viewsService';

//#endregion


//#region --- workbench services

import 'vs/platform/actions/common/actions.contribution';
import 'vs/platform/undoRedo/common/undoRedoService';
import 'vs/workbench/services/extensions/browser/extensionUrlHandler';
import 'vs/workbench/services/keybinding/common/keybindingEditing';
import 'vs/workbench/services/decorations/browser/decorationsService';
import 'vs/workbench/services/dialogs/common/dialogService';
import 'vs/workbench/services/progress/browser/progressService';
import 'vs/workbench/services/editor/browser/codeEditorService';
import 'vs/workbench/services/preferences/browser/preferencesService';
import 'vs/workbench/services/configuration/common/jsonEditingService';
import 'vs/workbench/services/textmodelResolver/common/textModelResolverService';
import 'vs/workbench/services/editor/browser/editorService';
import 'vs/workbench/services/editor/browser/editorResolverService';
import 'vs/workbench/services/history/browser/historyService';
import 'vs/workbench/services/activity/browser/activityService';
import 'vs/workbench/services/keybinding/browser/keybindingService';
import 'vs/workbench/services/untitled/common/untitledTextEditorService';
import 'vs/workbench/services/textresourceProperties/common/textResourcePropertiesService';
import 'vs/workbench/services/textfile/common/textEditorService';
import 'vs/workbench/services/language/common/languageService';
import 'vs/workbench/services/model/common/modelService';
import 'vs/workbench/services/commands/common/commandService';
import 'vs/workbench/services/themes/browser/workbenchThemeService';
import 'vs/workbench/services/label/common/labelService';
import 'vs/workbench/services/extensions/common/extensionManifestPropertiesService';
import 'vs/workbench/services/extensionManagement/browser/extensionEnablementService';
import 'vs/workbench/services/extensionManagement/browser/builtinExtensionsScannerService';
import 'vs/workbench/services/extensionRecommendations/common/extensionIgnoredRecommendationsService';
import 'vs/workbench/services/extensionRecommendations/common/workspaceExtensionsConfig';
import 'vs/workbench/services/notification/common/notificationService';
import 'vs/workbench/services/userDataSync/common/userDataSyncUtil';
import 'vs/workbench/services/userDataProfile/common/userDataProfileImportExportService';
import 'vs/workbench/services/userDataProfile/browser/userDataProfileManagement';
import 'vs/workbench/services/remote/common/remoteExplorerService';
import 'vs/workbench/services/workingCopy/common/workingCopyService';
import 'vs/workbench/services/workingCopy/common/workingCopyFileService';
import 'vs/workbench/services/workingCopy/common/workingCopyEditorService';
import 'vs/workbench/services/filesConfiguration/common/filesConfigurationService';
import 'vs/workbench/services/views/browser/viewDescriptorService';
import 'vs/workbench/services/quickinput/browser/quickInputService';
import 'vs/workbench/services/userDataSync/browser/userDataSyncWorkbenchService';
import 'vs/workbench/services/authentication/browser/authenticationService';
import 'vs/workbench/services/hover/browser/hoverService';
import 'vs/workbench/services/assignment/common/assignmentService';
import 'vs/workbench/services/outline/browser/outlineService';
import 'vs/workbench/services/languageDetection/browser/languageDetectionWorkerServiceImpl';
import 'vs/editor/common/services/languageFeaturesService';

import { registerSingleton } from 'vs/platform/instantiation/common/extensions';
import { ExtensionGalleryService } from 'vs/platform/extensionManagement/common/extensionGalleryService';
import { GlobalExtensionEnablementService } from 'vs/platform/extensionManagement/common/extensionEnablementService';
import { IExtensionGalleryService, IGlobalExtensionEnablementService } from 'vs/platform/extensionManagement/common/extensionManagement';
import { ContextViewService } from 'vs/platform/contextview/browser/contextViewService';
import { IContextViewService } from 'vs/platform/contextview/browser/contextView';
import { IListService, ListService } from 'vs/platform/list/browser/listService';
import { IEditorWorkerService } from 'vs/editor/common/services/editorWorker';
import { EditorWorkerService } from 'vs/editor/browser/services/editorWorkerService';
import { MarkerDecorationsService } from 'vs/editor/common/services/markerDecorationsService';
import { IMarkerDecorationsService } from 'vs/editor/common/services/markerDecorations';
import { IMarkerService } from 'vs/platform/markers/common/markers';
import { MarkerService } from 'vs/platform/markers/common/markerService';
import { ContextKeyService } from 'vs/platform/contextkey/browser/contextKeyService';
import { IContextKeyService } from 'vs/platform/contextkey/common/contextkey';
import { ITextResourceConfigurationService } from 'vs/editor/common/services/textResourceConfiguration';
import { TextResourceConfigurationService } from 'vs/editor/common/services/textResourceConfigurationService';
import { IDownloadService } from 'vs/platform/download/common/download';
import { DownloadService } from 'vs/platform/download/common/downloadService';
import { OpenerService } from 'vs/editor/browser/services/openerService';
import { IOpenerService } from 'vs/platform/opener/common/opener';
import { IgnoredExtensionsManagementService, IIgnoredExtensionsManagementService } from 'vs/platform/userDataSync/common/ignoredExtensions';
import { ExtensionStorageService, IExtensionStorageService } from 'vs/platform/extensionManagement/common/extensionStorage';
import { IUserDataSyncLogService } from 'vs/platform/userDataSync/common/userDataSync';
import { UserDataSyncLogService } from 'vs/platform/userDataSync/common/userDataSyncLog';
import { IExtensionsProfileScannerService, ExtensionsProfileScannerService } from 'vs/platform/extensionManagement/common/extensionsProfileScannerService';

registerSingleton(IUserDataSyncLogService, UserDataSyncLogService);
registerSingleton(IIgnoredExtensionsManagementService, IgnoredExtensionsManagementService);
registerSingleton(IGlobalExtensionEnablementService, GlobalExtensionEnablementService);
registerSingleton(IExtensionStorageService, ExtensionStorageService);
registerSingleton(IExtensionGalleryService, ExtensionGalleryService, true);
registerSingleton(IContextViewService, ContextViewService, true);
registerSingleton(IListService, ListService, true);
registerSingleton(IEditorWorkerService, EditorWorkerService);
registerSingleton(IMarkerDecorationsService, MarkerDecorationsService);
registerSingleton(IMarkerService, MarkerService, true);
registerSingleton(IContextKeyService, ContextKeyService);
registerSingleton(ITextResourceConfigurationService, TextResourceConfigurationService);
registerSingleton(IDownloadService, DownloadService, true);
registerSingleton(IOpenerService, OpenerService, true);
registerSingleton(IExtensionsProfileScannerService, ExtensionsProfileScannerService);

//#endregion

//#region -- sql services

import { IConnectionManagementService } from 'sql/platform/connection/common/connectionManagement';
import { ConnectionManagementService } from 'sql/workbench/services/connection/browser/connectionManagementService';
import { IConnectionDialogService } from 'sql/workbench/services/connection/common/connectionDialogService';
import { ConnectionDialogService } from 'sql/workbench/services/connection/browser/connectionDialogService';
import { IErrorMessageService } from 'sql/platform/errorMessage/common/errorMessageService';
import { ErrorMessageService } from 'sql/workbench/services/errorMessage/browser/errorMessageService';
import { ServerGroupController } from 'sql/workbench/services/serverGroup/browser/serverGroupController';
import { IServerGroupController } from 'sql/platform/serverGroup/common/serverGroupController';
import { ICapabilitiesService } from 'sql/platform/capabilities/common/capabilitiesService';
import { CapabilitiesService } from 'sql/platform/capabilities/common/capabilitiesServiceImpl';
import { ICredentialsService as sqlICredentialsService, CredentialsService } from 'sql/platform/credentials/common/credentialsService';
import { IQueryModelService } from 'sql/workbench/services/query/common/queryModel';
import { QueryModelService } from 'sql/workbench/services/query/common/queryModelService';
import { IQueryEditorService } from 'sql/workbench/services/queryEditor/common/queryEditorService';
import { QueryEditorService } from 'sql/workbench/services/queryEditor/browser/queryEditorService';
import { IQueryManagementService, QueryManagementService } from 'sql/workbench/services/query/common/queryManagement';
import { IResourceProviderService } from 'sql/workbench/services/resourceProvider/common/resourceProviderService';
import { ResourceProviderService } from 'sql/workbench/services/resourceProvider/browser/resourceProviderService';
import { IAdsTelemetryService } from 'sql/platform/telemetry/common/telemetry';
import { AdsTelemetryService } from 'sql/platform/telemetry/common/adsTelemetryService';
import { OEShimService, IOEShimService } from 'sql/workbench/services/objectExplorer/browser/objectExplorerViewTreeShim';
import { IObjectExplorerService, ObjectExplorerService } from 'sql/workbench/services/objectExplorer/browser/objectExplorerService';
import { IAngularEventingService } from 'sql/platform/angularEventing/browser/angularEventingService';
import { AngularEventingService } from 'sql/platform/angularEventing/browser/angularEventingServiceImpl';
import { ISerializationService, SerializationService } from 'sql/platform/serialization/common/serializationService';
import { IMetadataService, MetadataService } from 'sql/platform/metadata/common/metadataService';
import { ITaskService, TaskService } from 'sql/workbench/services/tasks/common/tasksService';
import { IEditorDescriptorService, EditorDescriptorService } from 'sql/workbench/services/queryEditor/browser/editorDescriptorService';
import { IAdminService, AdminService } from 'sql/workbench/services/admin/common/adminService';
import { IJobManagementService } from 'sql/workbench/services/jobManagement/common/interfaces';
import { JobManagementService } from 'sql/workbench/services/jobManagement/common/jobManagementService';
import { IBackupService } from 'sql/platform/backup/common/backupService';
import { BackupService } from 'sql/platform/backup/common/backupServiceImp';
import { IAzureBlobService } from 'sql/platform/azureBlob/common/azureBlobService';
import { AzureBlobService } from 'sql/workbench/services/azureBlob/browser/azureBlobService';
import { IBackupUiService } from 'sql/workbench/contrib/backup/common/backupUiService';
import { BackupUiService } from 'sql/workbench/contrib/backup/browser/backupUiService';
import { IRestoreDialogController, IRestoreService } from 'sql/workbench/services/restore/common/restoreService';
import { RestoreService, RestoreDialogController } from 'sql/workbench/services/restore/browser/restoreServiceImpl';
import { INewDashboardTabDialogService } from 'sql/workbench/services/dashboard/browser/newDashboardTabDialog';
import { NewDashboardTabDialogService } from 'sql/workbench/services/dashboard/browser/newDashboardTabDialogService';
import { IFileBrowserService } from 'sql/workbench/services/fileBrowser/common/interfaces';
import { FileBrowserService } from 'sql/workbench/services/fileBrowser/common/fileBrowserService';
import { IFileBrowserDialogController } from 'sql/workbench/services/fileBrowser/common/fileBrowserDialogController';
import { FileBrowserDialogController } from 'sql/workbench/services/fileBrowser/browser/fileBrowserDialogController';
import { IBackupRestoreUrlBrowserDialogService } from 'sql/workbench/services/backupRestoreUrlBrowser/common/urlBrowserDialogService';
import { BackupRestoreUrlBrowserDialogService } from 'sql/workbench/services/backupRestoreUrlBrowser/browser/urlBrowserDialogService';
import { IInsightsDialogService } from 'sql/workbench/services/insights/browser/insightsDialogService';
import { InsightsDialogService } from 'sql/workbench/services/insights/browser/insightsDialogServiceImpl';
import { IAccountManagementService } from 'sql/platform/accounts/common/interfaces';
import { AccountManagementService } from 'sql/workbench/services/accountManagement/browser/accountManagementService';
import { IProfilerService } from 'sql/workbench/services/profiler/browser/interfaces';
import { ProfilerService } from 'sql/workbench/services/profiler/browser/profilerService';
import { AccountPickerService } from 'sql/workbench/services/accountManagement/browser/accountPickerService';
import { IAccountPickerService } from 'sql/workbench/services/accountManagement/browser/accountPicker';
import { IDashboardViewService } from 'sql/platform/dashboard/browser/dashboardViewService';
import { DashboardViewService } from 'sql/platform/dashboard/browser/dashboardViewServiceImpl';
import { IModelViewService } from 'sql/platform/modelComponents/browser/modelViewService';
import { ModelViewService } from 'sql/platform/modelComponents/browser/modelViewServiceImpl';
import { IDashboardService } from 'sql/platform/dashboard/browser/dashboardService';
import { DashboardService } from 'sql/platform/dashboard/browser/dashboardServiceImpl';
import { NotebookService } from 'sql/workbench/services/notebook/browser/notebookServiceImpl';
import { INotebookService } from 'sql/workbench/services/notebook/browser/notebookService';
import { IScriptingService, ScriptingService } from 'sql/platform/scripting/common/scriptingService';
import { IAssessmentService } from 'sql/workbench/services/assessment/common/interfaces';
import { AssessmentService } from 'sql/workbench/services/assessment/common/assessmentService';
import { DataGridProviderService } from 'sql/workbench/services/dataGridProvider/browser/dataGridProviderService';
import { IDataGridProviderService } from 'sql/workbench/services/dataGridProvider/common/dataGridProviderService';
import { ITableDesignerService } from 'sql/workbench/services/tableDesigner/common/interface';
import { TableDesignerService } from 'sql/workbench/services/tableDesigner/browser/tableDesignerService';
import { IExecutionPlanService } from 'sql/workbench/services/executionPlan/common/interfaces';
import { ExecutionPlanService } from 'sql/workbench/services/executionPlan/common/executionPlanService';
import { IErrorDiagnosticsService } from 'sql/workbench/services/diagnostics/common/errorDiagnosticsService';
import { ErrorDiagnosticsService } from 'sql/workbench/services/diagnostics/browser/errorDiagnosticsService';
import { IComponentContextService, ComponentContextService } from 'sql/workbench/services/componentContext/browser/componentContextService';

registerSingleton(IDashboardService, DashboardService);
registerSingleton(IDashboardViewService, DashboardViewService);
registerSingleton(IModelViewService, ModelViewService);
registerSingleton(IAngularEventingService, AngularEventingService);
registerSingleton(INewDashboardTabDialogService, NewDashboardTabDialogService);
registerSingleton(IAccountManagementService, AccountManagementService);
registerSingleton(ISerializationService, SerializationService);
registerSingleton(IEditorDescriptorService, EditorDescriptorService);
registerSingleton(ITaskService, TaskService);
registerSingleton(IMetadataService, MetadataService);
registerSingleton(IAdminService, AdminService);
registerSingleton(IJobManagementService, JobManagementService);
registerSingleton(IBackupService, BackupService);
registerSingleton(IAzureBlobService, AzureBlobService);
registerSingleton(IBackupUiService, BackupUiService);
registerSingleton(IScriptingService, ScriptingService);
registerSingleton(IRestoreService, RestoreService);
registerSingleton(IRestoreDialogController, RestoreDialogController);
registerSingleton(IFileBrowserService, FileBrowserService);
registerSingleton(IFileBrowserDialogController, FileBrowserDialogController);
registerSingleton(IBackupRestoreUrlBrowserDialogService, BackupRestoreUrlBrowserDialogService);
registerSingleton(IInsightsDialogService, InsightsDialogService);
registerSingleton(INotebookService, NotebookService);
registerSingleton(IAccountPickerService, AccountPickerService);
registerSingleton(IProfilerService, ProfilerService);
registerSingleton(IConnectionManagementService, ConnectionManagementService as any);
registerSingleton(ICapabilitiesService, CapabilitiesService);
registerSingleton(IErrorMessageService, ErrorMessageService);
registerSingleton(IConnectionDialogService, ConnectionDialogService);
registerSingleton(IServerGroupController, ServerGroupController);
registerSingleton(sqlICredentialsService, CredentialsService);
registerSingleton(IResourceProviderService, ResourceProviderService);
registerSingleton(IQueryManagementService, QueryManagementService);
registerSingleton(IQueryModelService, QueryModelService);
registerSingleton(IQueryEditorService, QueryEditorService);
registerSingleton(IAdsTelemetryService, AdsTelemetryService);
registerSingleton(IObjectExplorerService, ObjectExplorerService);
registerSingleton(IOEShimService, OEShimService);
registerSingleton(IAssessmentService, AssessmentService);
registerSingleton(IDataGridProviderService, DataGridProviderService);
registerSingleton(ITableDesignerService, TableDesignerService);
registerSingleton(IExecutionPlanService, ExecutionPlanService);
registerSingleton(IErrorDiagnosticsService, ErrorDiagnosticsService);
registerSingleton(IComponentContextService, ComponentContextService);
//#endregion


//#region --- workbench contributions

// Telemetry
import 'vs/workbench/contrib/telemetry/browser/telemetry.contribution';

// Preferences
import 'vs/workbench/contrib/preferences/browser/preferences.contribution';
import 'vs/workbench/contrib/preferences/browser/keybindingsEditorContribution';
import 'vs/workbench/contrib/preferences/browser/preferencesSearch';

// Performance
import 'vs/workbench/contrib/performance/browser/performance.contribution';

// Context Menus
import 'vs/workbench/contrib/contextmenu/browser/contextmenu.contribution';

// Notebook
import 'vs/workbench/contrib/notebook/browser/notebook.contribution';

// Interactive
import 'vs/workbench/contrib/interactive/browser/interactive.contribution';

// Testing
import 'vs/workbench/contrib/testing/browser/testing.contribution';

// Logs
import 'vs/workbench/contrib/logs/common/logs.contribution';

// Quickaccess
import 'vs/workbench/contrib/quickaccess/browser/quickAccess.contribution';

// Explorer
import 'vs/workbench/contrib/files/browser/explorerViewlet';
import 'vs/workbench/contrib/files/browser/fileActions.contribution';
import 'vs/workbench/contrib/files/browser/files.contribution';

// Bulk Edit
import 'vs/workbench/contrib/bulkEdit/browser/bulkEditService';
import 'vs/workbench/contrib/bulkEdit/browser/preview/bulkEdit.contribution';

// Search
import 'vs/workbench/contrib/search/browser/search.contribution';
import 'vs/workbench/contrib/search/browser/searchView';

// Search Editor
import 'vs/workbench/contrib/searchEditor/browser/searchEditor.contribution';

// Sash
import 'vs/workbench/contrib/sash/browser/sash.contribution';

// SCM
import 'vs/workbench/contrib/scm/browser/scm.contribution';

/* {{SQL CARBON EDIT}} // Debug
import 'vs/workbench/contrib/debug/browser/debug.contribution';
import 'vs/workbench/contrib/debug/browser/debugEditorContribution';
import 'vs/workbench/contrib/debug/browser/breakpointEditorContribution';
import 'vs/workbench/contrib/debug/browser/callStackEditorContribution';
import 'vs/workbench/contrib/debug/browser/repl';
import 'vs/workbench/contrib/debug/browser/debugViewlet';
*/

// Markers
import 'vs/workbench/contrib/markers/browser/markers.contribution';

// Merge Editor
import 'vs/workbench/contrib/mergeEditor/browser/mergeEditor.contribution';

// Comments
import 'vs/workbench/contrib/comments/browser/comments.contribution';

// URL Support
import 'vs/workbench/contrib/url/browser/url.contribution';

// Webview
import 'vs/workbench/contrib/webview/browser/webview.contribution';
import 'vs/workbench/contrib/webviewPanel/browser/webviewPanel.contribution';
import 'vs/workbench/contrib/webviewView/browser/webviewView.contribution';
import 'vs/workbench/contrib/customEditor/browser/customEditor.contribution';

// External Uri Opener
import 'vs/workbench/contrib/externalUriOpener/common/externalUriOpener.contribution';

// Extensions Management
import 'vs/workbench/contrib/extensions/browser/extensions.contribution';
import 'vs/workbench/contrib/extensions/browser/extensionsViewlet';

// Output View
import 'vs/workbench/contrib/output/browser/output.contribution';
import 'vs/workbench/contrib/output/browser/outputView';

// Terminal
import 'vs/workbench/contrib/terminal/common/environmentVariable.contribution';
import 'vs/workbench/contrib/terminal/common/terminalExtensionPoints.contribution';
import 'vs/workbench/contrib/externalTerminal/browser/externalTerminal.contribution';
import 'vs/workbench/contrib/terminal/browser/terminal.contribution';
import 'vs/workbench/contrib/terminal/browser/terminalView';

// Relauncher
import 'vs/workbench/contrib/relauncher/browser/relauncher.contribution';

// Tasks
import 'vs/workbench/contrib/tasks/browser/task.contribution';

// {{SQL CARBON EDIT}}
// Remote
// import 'vs/workbench/contrib/remote/common/remote.contribution';
// import 'vs/workbench/contrib/remote/browser/remote.contribution';

// Emmet
// import 'vs/workbench/contrib/emmet/browser/emmet.contribution'; {{SQL CARBON EDIT}}

// CodeEditor Contributions
import 'vs/workbench/contrib/codeEditor/browser/codeEditor.contribution';

// Keybindings Contributions
import 'vs/workbench/contrib/keybindings/browser/keybindings.contribution';

// Snippets
import 'vs/workbench/contrib/snippets/browser/snippets.contribution';

// Formatter Help
import 'vs/workbench/contrib/format/browser/format.contribution';

// Inlay Hint Accessibility
import 'vs/workbench/contrib/inlayHints/browser/inlayHintsAccessibilty';

// Themes
import 'vs/workbench/contrib/themes/browser/themes.contribution';

// Update
import 'vs/workbench/contrib/update/browser/update.contribution';

// Watermark
import 'vs/workbench/contrib/watermark/browser/watermark';

// Surveys
import 'vs/workbench/contrib/surveys/browser/nps.contribution';
import 'vs/workbench/contrib/surveys/browser/ces.contribution';
import 'vs/workbench/contrib/surveys/browser/languageSurveys.contribution';

// Welcome
import 'vs/workbench/contrib/welcomeOverlay/browser/welcomeOverlay';
import 'sql/workbench/contrib/welcome/page/browser/welcomePage.contribution'; // {{SQL CARBON EDIT}} - add welcome page contribution
import 'sql/workbench/contrib/welcome/notifyEncryption/notifyEncryption.contribution'; // {{SQL CARBON EDIT}} - add notifying Encrypt change contribution
import 'sql/workbench/contrib/welcome/notifyHiddenTenant/notifyHiddenTenant.contribution'; // {{SQL CARBON EDIT}} - add notifying Hidden Tenant change contribution
// import 'vs/workbench/contrib/welcomeGettingStarted/browser/gettingStarted.contribution'; // {{SQL CARBON EDIT}} - remove vscode getting started
import 'vs/workbench/contrib/welcomeWalkthrough/browser/walkThrough.contribution';
import 'vs/workbench/contrib/welcomeViews/common/viewsWelcome.contribution';
import 'vs/workbench/contrib/welcomeViews/common/newFile.contribution';

// Call Hierarchy
import 'vs/workbench/contrib/callHierarchy/browser/callHierarchy.contribution';

// Type Hierarchy
import 'vs/workbench/contrib/typeHierarchy/browser/typeHierarchy.contribution';

// Outline
import 'vs/workbench/contrib/codeEditor/browser/outline/documentSymbolsOutline';
import 'vs/workbench/contrib/outline/browser/outline.contribution';

// Language Detection
import 'vs/workbench/contrib/languageDetection/browser/languageDetection.contribution';

// Language Status
import 'vs/workbench/contrib/languageStatus/browser/languageStatus.contribution';

// Experiments
import 'vs/workbench/contrib/experiments/browser/experiments.contribution';

// Send a Smile
import 'vs/workbench/contrib/feedback/browser/feedback.contribution';

// User Data Sync
import 'vs/workbench/contrib/userDataSync/browser/userDataSync.contribution';

// User Data Profiles
import 'vs/workbench/contrib/userDataProfile/browser/userDataProfile.contribution';

// Continue Edit Session
import 'vs/workbench/contrib/editSessions/browser/editSessions.contribution';

// Code Actions
import 'vs/workbench/contrib/codeActions/browser/codeActions.contribution';

// Timeline
import 'vs/workbench/contrib/timeline/browser/timeline.contribution';

// Local History
import 'vs/workbench/contrib/localHistory/browser/localHistory.contribution';

// Workspace
import 'vs/workbench/contrib/workspace/browser/workspace.contribution';

// Workspaces
import 'vs/workbench/contrib/workspaces/browser/workspaces.contribution';

// List
import 'vs/workbench/contrib/list/browser/list.contribution';

// {{SQL CARBON EDIT}} - disable audio cues
// Audio Cues
// import 'vs/workbench/contrib/audioCues/browser/audioCues.contribution';

//#endregion

//#region -- contributions

// query
import 'sql/workbench/contrib/query/browser/query.contribution';
import 'sql/workbench/contrib/query/common/resultsGrid.contribution';

// data explorer
import 'sql/workbench/contrib/dataExplorer/browser/dataExplorer.contribution';
import 'sql/workbench/contrib/dataExplorer/browser/nodeActions.common.contribution';

//configurationUpgrader replacement
import 'sql/workbench/contrib/configuration/common/configurationUpgrader.contribution';

// tasks
import 'sql/workbench/contrib/tasks/browser/tasks.contribution';
import 'sql/workbench/browser/actions.contribution';

// telemetry
import 'sql/workbench/contrib/telemetry/common/telemetry.contribution';

// connection
import 'sql/workbench/contrib/connection/browser/connection.contribution';
import 'sql/workbench/contrib/connection/common/connectionProviderExtension';
import 'sql/workbench/contrib/objectExplorer/common/serverGroup.contribution';

// edit data editor
import 'sql/workbench/contrib/editData/browser/editData.contribution';

//acounts
import 'sql/workbench/contrib/accounts/browser/accounts.contribution';
import 'sql/workbench/contrib/accounts/browser/accountManagement.contribution';

// profiler
import 'sql/workbench/contrib/profiler/browser/profiler.contribution';
import 'sql/workbench/contrib/profiler/browser/profilerActions.contribution';

// resource viewer
import 'sql/workbench/contrib/resourceViewer/browser/resourceViewer.contribution';

// dashboard
import 'sql/workbench/contrib/dashboard/browser/widgets/insights/views/charts/types/barChart.contribution';
import 'sql/workbench/contrib/dashboard/browser/widgets/insights/views/charts/types/doughnutChart.contribution';
import 'sql/workbench/contrib/dashboard/browser/widgets/insights/views/charts/types/horizontalBarChart.contribution';
import 'sql/workbench/contrib/dashboard/browser/widgets/insights/views/charts/types/lineChart.contribution';
import 'sql/workbench/contrib/dashboard/browser/widgets/insights/views/charts/types/pieChart.contribution';
import 'sql/workbench/contrib/dashboard/browser/widgets/insights/views/charts/types/scatterChart.contribution';
import 'sql/workbench/contrib/dashboard/browser/widgets/insights/views/charts/types/timeSeriesChart.contribution';
import 'sql/workbench/contrib/dashboard/browser/widgets/insights/views/countInsight.contribution';
import 'sql/workbench/contrib/dashboard/browser/widgets/insights/views/imageInsight.contribution';
import 'sql/workbench/contrib/dashboard/browser/widgets/insights/views/tableInsight.contribution';
import 'sql/workbench/contrib/dashboard/browser/dashboard.contribution';
import 'sql/workbench/contrib/dashboard/browser/widgets/insights/insightsWidget.contribution';
import 'sql/workbench/contrib/dashboard/browser/widgets/explorer/explorerWidget.contribution';
import 'sql/workbench/contrib/dashboard/browser/widgets/webview/webviewWidget.contribution';
import 'sql/workbench/contrib/dashboard/browser/containers/dashboardWebviewContainer.contribution';
import 'sql/workbench/contrib/dashboard/browser/containers/dashboardControlHostContainer.contribution';
import 'sql/workbench/contrib/dashboard/browser/containers/dashboardGridContainer.contribution';
import 'sql/workbench/contrib/dashboard/browser/containers/dashboardWidgetContainer.contribution';
import 'sql/workbench/contrib/dashboard/browser/containers/dashboardContainer.contribution';
import 'sql/workbench/contrib/dashboard/browser/containers/dashboardNavSection.contribution';
import 'sql/workbench/contrib/dashboard/browser/containers/dashboardModelViewContainer.contribution';
import 'sql/workbench/contrib/dashboard/browser/core/dashboardTab.contribution';

// Model-based Views
import 'sql/workbench/contrib/modelView/browser/components.contribution';
import 'sql/workbench/browser/modelComponents/modelViewEditor.contribution';

// notebooks
import 'sql/workbench/contrib/notebook/browser/notebook.contribution';

// backup
import 'sql/workbench/contrib/backup/browser/backup.contribution';

//restore
import 'sql/workbench/contrib/restore/browser/restore.contribution';

// Scripting
import 'sql/workbench/contrib/scripting/browser/scripting.contribution';

// Resource Deployment
import 'sql/workbench/contrib/resourceDeployment/browser/resourceDeployment.contribution';

// Extension
import 'sql/workbench/contrib/extensions/browser/extensions.contribution';

// TSGOps ads light image
import 'sql/workbench/contrib/tsgops/browser/tsgops.contribution';

// Azure
import 'sql/workbench/contrib/azure/browser/azure.contribution';

// Charts
import 'sql/workbench/contrib/charts/browser/charts.contribution';

// table designer
import 'sql/workbench/contrib/tableDesigner/browser/tableDesigner.contribution';

// execution plan
import 'sql/workbench/contrib/executionPlan/browser/executionPlanContribution';

// table
import 'sql/workbench/contrib/table/browser/table.contribution';

// Deprecated Extension Migrator
import 'vs/workbench/contrib/deprecatedExtensionMigrator/browser/deprecatedExtensionMigrator.contribution';

// Bracket Pair Colorizer 2 Telemetry
import 'vs/workbench/contrib/bracketPairColorizer2Telemetry/browser/bracketPairColorizer2Telemetry.contribution';

//#endregion
