import { ContextComplete } from '../context/bundles/context-bundle-button';
/**
 * This is for building/serializing the main url params when opening a dialog.
 * It does not contain the "params" / "items" part
 * @internal
 */
export class DialogCoreParams {
  readonly zoneId: number;
  readonly appId: number;
  readonly mid: number;
  readonly cbid: number;

  readonly partOfPage?: boolean;
  readonly publishing?: string;

  /** new in 10.27 - for quick-dialog */
  readonly apps?: string;

  public dialogSettings?: unknown;

  constructor(context: ContextComplete, partOfPage: boolean) {

    // #CustomContext
    // Note that as of v18, the #CustomContext was probably never fully completed
    const ctx = context.sxc?.ctx;
    if (ctx?.complete === true) {
        this.zoneId = ctx.zoneId;
        this.appId = ctx.appId;

        // Only set moduleId and cbid if they are specified
        if (ctx.moduleId != null)
          this.mid = ctx.moduleId;
        const cbid = ctx?.blockId ?? this.mid;
        if (cbid)
          this.cbid = cbid;
    } else {
        this.zoneId = ctx?.zoneId ?? context.app.zoneId;
        this.appId = ctx?.appId ?? context.app.id;
        this.mid = ctx?.moduleId ?? context.instance.id;
        this.cbid = ctx?.blockId ?? context.contentBlockReference.id;
    }

    // If this action is "part of the page" then tell the dialog how the publishing should work
    this.partOfPage = partOfPage;
    if (partOfPage)
      this.publishing = context.contentBlockReference.publishingMode;

    // new in 10.27 - for quick-dialog
    // I believe it's to restrict apps which can be selected
    // for adding to inner content.
    // Note that this is probably an undocumented feature, which should be surfaced some day.
    if (context.button?.command?.params?.apps)
        this.apps = context.button.command.params.apps;

    this.dialogSettings = context.button?.command?.params?.dialogSettings;
    if (!this.dialogSettings)
      delete this.dialogSettings;
  }
}
