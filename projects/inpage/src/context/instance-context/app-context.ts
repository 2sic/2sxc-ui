/**
 * this will be about the current app, settings of the app, app - paths, etc.
 */
export class AppContext {
  // ContentGroup
  isContent: boolean; // if it’s the main Content app or not
  settingsId: number;
  resourcesId: number;
  appPath: string;
  hasContent: boolean;
  supportsAjax: boolean;
  zoneId: number;
  id: number; // appId
  // languages
  currentLanguage: string;
  primaryLanguage: string;
  allLanguages: string[] | null;
}
