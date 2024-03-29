﻿import { Sxc } from '../../../../$2sxc/src/sxc/sxc';
import { AttrJsonEditContext } from '../html-attribute';
import { ContextOfInstance, ContextOfPage, ContextOfSystem, ContextOfTenant, ContextOfUser } from '../parts';
import { ContextOfApp } from '../parts/context-app';
import { ContextOfUi } from '../parts/context-ui';

/**
 * @public
 */
export class ContextBundleInstance {
  /**
   * instance of sxc object
   */
  sxc: Sxc;

  /** @internal */
  instance: ContextOfInstance; // information related to the current DNN module, incl.instanceId, etc.
  /** @internal */
  app: ContextOfApp; // this will be about the current app, settings of the app, app - paths, etc.
  /** @internal */
  ui: ContextOfUi; // ensure that the UI will load the correct assets to enable editing
  /** @internal */
  page: ContextOfPage; // this will be information related to the current page
  /** @internal */
  system: ContextOfSystem; // this will be everything about the current system, like system / api -paths etc.
  /** @internal */
  tenant: ContextOfTenant; // this will be something about the current tenant(the dnn portal)
  /** @internal */
  user: ContextOfUser; // things about the user

  _isContext = true;

  /** @internal */
  constructor(editCtx: AttrJsonEditContext, sxc: Sxc) {
    // this will be about the current app, settings of the app, app - paths, etc.
    this.app = new ContextOfApp(editCtx, sxc);

    // information related to the current DNN module, incl.instanceId, etc.
    this.instance = new ContextOfInstance(editCtx, sxc);

    // things about the user
    this.user = new ContextOfUser(editCtx);

    // this will be information related to the current page
    this.page = new ContextOfPage(editCtx, sxc);

    // this will be everything about the current system, like system / api -paths etc.
    this.system = new ContextOfSystem(editCtx);

    // this will be something about the current tenant(the dnn portal)
    this.tenant = new ContextOfTenant(editCtx);

    // ensure that the UI will load the correct assets to enable editing
    this.ui = new ContextOfUi(editCtx);
  }

  /** @internal */
  static is(thing: unknown): thing is ContextBundleInstance {
    const maybeButton = thing as ContextBundleInstance;
    return maybeButton.sxc !== undefined && maybeButton.instance !== undefined;
  }
}
