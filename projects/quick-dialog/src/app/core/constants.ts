export const Constants = {
  logName: 'quick-edit',

  //#region WebApi Endpoints used: 2sxc
  webApiDialogContext: 'admin/dialog/settings',
  webApiInstallPackage: 'sys/install/RemotePackage',
  webApiRemoteInstaller: 'sys/install/RemoteWizardUrl',
  webApiGetTemplates: 'cms/block/Templates',
  webApiGetTypes: 'cms/block/ContentTypes',
  webApiGetApps: 'cms/block/Apps',
  webApiSetApp: 'cms/block/App',
  //#endregion
};

/** These are all the url params the UI needs to function */
export const urlParams = {

  // These are used in UI.html, but we keep them here so we have a full list documented
  pageId: 'tid',
  requestVerificationToken: 'rvt',
  api: 'api',

  /** Context: App we're on */
  appId: 'appId',

  /** Selection of what apps should be shown by the dialog */
  apps: 'apps',

  /** Context: Module we're on */
  moduleId: 'mid',

  /** Context: ContentBlock we're on */
  contentBlockId: 'cbid',
};
