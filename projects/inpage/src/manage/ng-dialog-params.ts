import { ContextComplete } from '../context/bundles/context-bundle-button';
/**
 * This is for building/serializing the main url params when opening a dialog.
 * It does not contain the "params" / "items" part
 * @export
 * @class NgUrlValuesWithoutParams
 * @internal
 */
export class NgUrlValuesWithoutParams {
  readonly zoneId: number;
  readonly appId: number;
  // #reduceEnvVars
  // readonly tid: number;
  readonly mid: number;
  readonly cbid: number;

  readonly partOfPage?: boolean;
  readonly publishing?: string;
  // #reduceEnvVars
  // readonly approot: string | null;

  // #reduceEnvVars
  /** The api root for all 2sxc API calls - will vary by platform */
  // readonly api: string;

  /** new in 10.27 - for quick-dialog */
  readonly apps?: string;

  // 2022-06-16 2dm disabled, believe it's not used any more
  /** features of App - this is to tell the UI it can show advanced features of an app like permissions, API, REST etc. */
  // readonly fa: boolean;

  // #reduceEnvVars
  /** request verification token header name */
  // readonly rvth: string;

  // #reduceEnvVars
  /** request verification token value */
  // readonly rvt: string;

  constructor(context: ContextComplete, partOfPage: boolean) {

    const $2sxc = window.$2sxc;
    // #CustomContext
    const ctx = context.sxc?.ctx;
    if (ctx?.complete === true) {
        this.zoneId = ctx.zoneId;
        this.appId = ctx.appId;
        // #reduceEnvVars
        // if (ctx.pageId != null) this.tid = ctx.pageId;
        if (ctx.moduleId != null) this.mid = ctx.moduleId;
        const cbid = ctx?.blockId ?? this.mid;
        if (cbid != null && cbid) this.cbid = cbid;
    } else {
        this.zoneId = ctx?.zoneId ?? context.app.zoneId;
        this.appId = ctx?.appId ?? context.app.id;
        // #reduceEnvVars
        // this.tid = ctx?.pageId ?? context.page.id;
        this.mid = ctx?.moduleId ?? context.instance.id;
        this.cbid = ctx?.blockId ?? context.contentBlockReference.id;
    }

    // #reduceEnvVars
    // this.api = $2sxc.env.api();

    this.partOfPage = partOfPage;
    if (partOfPage) this.publishing = context.contentBlockReference.publishingMode;
    // todo= probably move the user into the dashboard info
    // 2021-01-19 2dm - should now not be used any more
    // this.user = ContextOfUser.fromContext(context);
    // TODO: #paramCleanUp - approot is probably not used anymore. verify and remove

    // #reduceEnvVars
    // this.approot = context.app.appPath || null; // this is the only value which doesn't have a slash by default. note that the app-root doesn't exist when opening "manage-app"
    if (context?.button?.command?.params?.apps)
        this.apps = context.button.command.params.apps;

    // TODO: #paramCleanUp - fa is probably not used anymore. verify and remove
    // #reduceEnvVars
    // this.fa = !context.app.isContent;
    // this.rvth = $2sxc.env.rvtHeader();
    // this.rvt = $2sxc.env.rvt();
  }
}
