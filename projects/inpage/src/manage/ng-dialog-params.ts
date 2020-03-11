import { ContextOfButton } from '../context/parts/context-button';
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
  readonly langs: string; // string[] | null;
  readonly portalroot: string;
  readonly websiteroot: string;
  readonly partOfPage?: boolean;
//   readonly versioningRequirements?: string;
  readonly publishing?: string;
  readonly user: UserOfEditContext;
  readonly approot: string | null;

  /** features of App - this is to tell the UI it can show advanced features of an app like permissions, API, REST etc. */
  readonly fa: boolean;

  /** request verification token for form */
  readonly rvt: string;


//   static fromContext(context: ContextOfButton): NgUrlValuesWithoutParams {
//     const params = new NgUrlValuesWithoutParams();
//     params.zoneId = context.app.zoneId;
//     params.appId = context.app.id;
//     params.tid = context.page.id;
//     params.mid = context.instance.id;
//     params.cbid = context.contentBlock.id;
//     params.lang = context.app.currentLanguage;
//     params.langpri = context.app.primaryLanguage;
//     params.langs = JSON.stringify(context.app.allLanguages);
//     params.portalroot = context.tenant.url;
//     params.websiteroot = context.instance.sxcRootUrl;
//     params.partOfPage = context.contentBlock.partOfPage;
//     // versioningRequirements= editContext.ContentBlock.VersioningRequirements;
//     params.publishing = context.contentBlock.versioningRequirements;
//     // todo= probably move the user into the dashboard info
//     params.user = UserOfEditContext.fromContext(context);
//     params.approot = context.app.appPath || null; // this is the only value which doesn't have a slash by default. note that the app-root doesn't exist when opening "manage-app"
//     params.fa = !context.app.isContent;
//     params.rvt = $.ServicesFramework(0).getAntiForgeryValue();
//     console.log('rvt', params.rvt);
//     return params;
//   }

  constructor(context: ContextOfButton, partOfPage: boolean) {
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
    this.fa = !context.app.isContent;
    this.rvt = $.ServicesFramework(0).getAntiForgeryValue();
  }

}
