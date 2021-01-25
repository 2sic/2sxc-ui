
/** These are all the url params the UI needs to function */
export const urlParams = {
  // These are used in UI.html, but we keep them here so we have a full list documented
  pageId: 'tid',
  requestVerificationToken: 'rvt',
  api: 'api',

  /** 
   * Context: App we're on. 
   * This is often 0 (zero) as initially it's not known. 
   */
  appId: 'appId',

  /** 
   * Selection of what apps should be shown by the dialog 
   * this is an optional parameter
   */
  apps: 'apps',

  /** Context: Module we're on */
  moduleId: 'mid',

  /** Context: ContentBlock we're on */
  contentBlockId: 'cbid',
};
