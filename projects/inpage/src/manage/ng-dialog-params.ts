import { ContextOfButton } from '../context/context-of-button';
import { UserOfEditContext } from './user-of-edit-context';

export class NgDialogParams {
  zoneId: number;
  appId: number;
  tid: number;
  mid: number;
  cbid: number;
  lang: string;
  langpri: string;
  langs: any; // string[] | null;
  portalroot: string;
  websiteroot: string;
  partOfPage: boolean;
  versioningRequirements: string;
  publishing: string;
  user: UserOfEditContext;
  approot: string | null;

  /** features of App - this is to tell the UI it can show advanced features of an app like permissions, API, REST etc. */
  fa: boolean;

  /** request verification token for form */
  rvt: string;

  // constructor(sxc: SxcInstanceWithInternals, editContext: DataEditContext) {
  //  this.zoneId = editContext.ContentGroup.ZoneId;
  //  this.appId = editContext.ContentGroup.AppId;
  //  this.tid = editContext.Environment.PageId;
  //  this.mid = editContext.Environment.InstanceId;
  //  this.cbid = sxc.cbid;
  //  this.lang = editContext.Language.Current;
  //  this.langpri = editContext.Language.Primary;
  //  this.langs = JSON.stringify(editContext.Language.All);
  //  this.portalroot = editContext.Environment.WebsiteUrl;
  //  this.websiteroot = editContext.Environment.SxcRootUrl;
  //  this.partOfPage = editContext.ContentBlock.PartOfPage;
  //  // versioningRequirements= editContext.ContentBlock.VersioningRequirements;
  //  this.publishing = editContext.ContentBlock.VersioningRequirements;
  //  // todo= probably move the user into the dashboard info
  //  this.user = getUserOfEditContext(editContext);
  //  this.approot = editContext.ContentGroup.AppUrl || null; // this is the only value which doesn't have a slash by default. note that the app-root doesn't exist when opening "manage-app"
  // }

  static fromContext(context: ContextOfButton): NgDialogParams {
    const params = new NgDialogParams();
    params.zoneId = context.app.zoneId;
    params.appId = context.app.id;
    params.tid = context.page.id;
    params.mid = context.instance.id;
    params.cbid = context.contentBlock.id;
    params.lang = context.app.currentLanguage;
    params.langpri = context.app.primaryLanguage;
    params.langs = JSON.stringify(context.app.allLanguages);
    params.portalroot = context.tenant.url;
    params.websiteroot = context.instance.sxcRootUrl;
    params.partOfPage = context.contentBlock.partOfPage;
    // versioningRequirements= editContext.ContentBlock.VersioningRequirements;
    params.publishing = context.contentBlock.versioningRequirements;
    // todo= probably move the user into the dashboard info
    params.user = UserOfEditContext.fromContext(context);
    params.approot = context.app.appPath || null; // this is the only value which doesn't have a slash by default. note that the app-root doesn't exist when opening "manage-app"
    params.fa = !context.app.isContent;
    params.rvt = $.ServicesFramework(0).getAntiForgeryValue();
    console.log('rvt', params.rvt);
    return params;
  }
}
