import { ContextBundleButton } from '../context/bundles/context-bundle-button';
import { UserOfEditContext } from './user-of-edit-context';

/**
 * This is for building/serializing the main url params when opening a dialog.
 * It does not contain the "params" / "items" part
 * @export
 * @class NgUrlValuesWithoutParams
 */
export class NgUrlValuesWithoutParams {
  readonly zoneId: number;
  readonly appId: number;
  readonly tid: number;
  readonly mid: number;
  readonly cbid: number;
  readonly lang: string;
  readonly langpri: string;
  readonly langs: string;
  readonly portalroot: string;
  readonly websiteroot: string;
  readonly partOfPage?: boolean;
  readonly publishing?: string;
  readonly user: UserOfEditContext;
  readonly approot: string | null;

  /** new in 10.27 */
  readonly apps?: string;

  /** features of App - this is to tell the UI it can show advanced features of an app like permissions, API, REST etc. */
  readonly fa: boolean;

  /** request verification token for form */
  readonly rvt: string;

  constructor(context: ContextBundleButton, partOfPage: boolean) {
    this.zoneId = context.app.zoneId;
    this.appId = context.app.id;
    this.tid = context.page.id;
    this.mid = context.instance.id;
    this.cbid = context.contentBlock.id;
    this.lang = context.app.currentLanguage;
    this.langpri = context.app.primaryLanguage;
    this.langs = JSON.stringify(context.app.allLanguages);
    this.portalroot = context.tenant.url;
    this.websiteroot = context.instance.sxcRootUrl;

    this.partOfPage = partOfPage; // context.contentBlock.partOfPage;
    if (partOfPage) {
        // 2020-03-11 2dm - this never seems to be set a.nywhere
        // versioningRequirements= editContext.ContentBlock.VersioningRequirements;
        this.publishing = context.contentBlock.versioningRequirements;
    }
    // todo= probably move the user into the dashboard info
    this.user = UserOfEditContext.fromContext(context);
    this.approot = context.app.appPath || null; // this is the only value which doesn't have a slash by default. note that the app-root doesn't exist when opening "manage-app"
    if (context && context.button && context.button.action && context.button.action.params && context.button.action.params.apps)
        this.apps = context.button.action.params.apps;
    this.fa = !context.app.isContent;
    this.rvt = $.ServicesFramework(0).getAntiForgeryValue();
  }

}
