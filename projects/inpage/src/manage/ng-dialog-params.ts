﻿import { ContextComplete } from '../context/bundles/context-bundle-button';
import { $2sxcInPage as $2sxc } from '../interfaces/sxc-controller-in-page';
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

  // 2021-01-19
  // readonly lang: string;
  // readonly langpri: string;
  // readonly langs: string;
  // 2020-11-28 #cleanup11.11 2dm - not used, disabled - keep till Jan 2021, then remove from backend-json and drop these comments
  // readonly portalroot: string;
  // 2020-12-11 #cleanup11.11 2dm - doesn't seem used, disabled
  // readonly websiteroot: string;
  readonly partOfPage?: boolean;
  readonly publishing?: string;
  // 2021-01-19
  // readonly user: ContextOfUser;
  readonly approot: string | null;

  /** The api root for all 2sxc API calls - will vary by platform */
  readonly api: string;

  /** The root path to the UIs (scripts, css etc.) */
  // 2021-01-19
  // readonly uiRoot: string;

  /** new in 10.27 */
  readonly apps?: string;

  /** features of App - this is to tell the UI it can show advanced features of an app like permissions, API, REST etc. */
  readonly fa: boolean;

  /** request verification token for form */
  readonly rvt: string;

  constructor(context: ContextComplete, partOfPage: boolean) {
    this.zoneId = context.app.zoneId;
    this.appId = context.app.id;
    this.tid = context.page.id;
    this.mid = context.instance.id;
    this.cbid = context.contentBlockReference.id;

    // 2021-01-19
    // this.lang = context.app.currentLanguage;
    // this.langpri = context.app.primaryLanguage;
    // this.langs = JSON.stringify(context.app.allLanguages);

    // 2020-11-28 #cleanup11.11 2dm - not used, disabled - keep till Jan 2021, then remove from backend-json and drop these comments
    // this.portalroot = context.tenant.url;
    // 2020-12-11 #cleanup11.11 2dm - doesn't seem used, disabled
    // this.websiteroot = context.instance.sxcRootUrl;

    // New in 11.05.01
    this.api = $2sxc.env.api();
    // 2021-01-19
    // this.uiRoot = $2sxc.env.uiRoot();

    this.partOfPage = partOfPage;
    if (partOfPage) this.publishing = context.contentBlockReference.publishingMode;
    // todo= probably move the user into the dashboard info
    // 2021-01-19 2dm - should now not be used any more
    // this.user = ContextOfUser.fromContext(context);
    this.approot = context.app.appPath || null; // this is the only value which doesn't have a slash by default. note that the app-root doesn't exist when opening "manage-app"
    if (context?.button?.command?.params?.apps)
        this.apps = context.button.command.params.apps;
    this.fa = !context.app.isContent;
    this.rvt = $2sxc.env.rvt();
  }
}
