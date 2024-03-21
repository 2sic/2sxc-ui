import { Sxc } from '../../../$2sxc/src/sxc/sxc';
import { RunParams } from '../../../$2sxc/src/cms/run-params';
import { SxcCms } from '../../../$2sxc/src/sxc/sxc-cms';
import { RunParamsHelpers } from '../cms/run-params-helpers';
import { SxcGlobalCms } from '../cms/sxc-global-cms';

/**
 * This is in charge of sxc.cms on the instance level.
 * ATM it just has the run command.
 * In future, it may also have dedicated command like `layout` etc.
 * @internal
 */
export class SxcCmsReal extends SxcCms {

  /** @internal */
  constructor(sxc: Sxc) {
    super(sxc);
  }

  /**
   * Run a command on this sxc-instance.
   * Requires edit mode to be on, which would enable the edit-JS parts.
   * To use, remember to activate `2sxc.JsCms` on the page
   * @param runParams - real type is actually RunParams
   */
  run<T>(runParams: RunParams): Promise<void | T> {
    RunParamsHelpers.ensureRunParamsInstanceOrError(runParams);
    return new SxcGlobalCms().runInternal({ ...runParams, context: this.sxc });
  }

  // runTemplateDevelop() {
  //   this.runVerb(CommandNames.templateDevelop);
  // }

  // private runVerb(action: CommandNames, params?: CommandParams) {
  //   this.run({ action: action, params: params });
  // }
}
