import { ContextComplete } from '../context/bundles/context-bundle-button';
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

  /** request verification token header name */
  readonly rvth: string;

  /** request verification token value */
  readonly rvt: string;

  constructor(context: ContextComplete, partOfPage: boolean) {

    // console.log('2dm - context', context);
    // #CustomContext
    const ctx = context.sxc?.ctx;
    const ctxAny = ctx as any;
    if (ctxAny?.complete === true) {
        this.zoneId = ctx.zoneId;
        this.appId = ctx.appId;
        this.tid = ctx.pageId ?? -2742;
        this.mid = ctx.moduleId ?? -2742;
        this.cbid = ctxAny?.blockId ?? this.mid;
    } else {
        this.zoneId = ctx?.zoneId ?? context.app.zoneId;
        this.appId = ctx?.appId ?? context.app.id;
        this.tid = ctx?.pageId ?? context.page.id;
        this.mid = ctx?.moduleId ?? context.instance.id;
        this.cbid = ctxAny?.blockId ?? context.contentBlockReference.id;
    }

    this.api = $2sxc.env.api();

    this.partOfPage = partOfPage;
    if (partOfPage) this.publishing = context.contentBlockReference.publishingMode;
    // todo= probably move the user into the dashboard info
    // 2021-01-19 2dm - should now not be used any more
    // this.user = ContextOfUser.fromContext(context);
    // TODO: #paramCleanUp - approot is probably not used anymore. verify and remove
    this.approot = context.app.appPath || null; // this is the only value which doesn't have a slash by default. note that the app-root doesn't exist when opening "manage-app"
    if (context?.button?.command?.params?.apps)
        this.apps = context.button.command.params.apps;
    // TODO: #paramCleanUp - fa is probably not used anymore. verify and remove
    this.fa = !context.app.isContent;
    this.rvth = $2sxc.env.rvtHeader();
    this.rvt = $2sxc.env.rvt();
  }
}
