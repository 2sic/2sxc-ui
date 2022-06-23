import { CommandParams } from '../commands';
import { HasLog, Log } from '../core';
import { RunParamsWithContext } from '../../../$2sxc/src/cms';
/**
 * Helper class to process parameters given to the Cms.Run statement
 * Important because certain params may sometimes be full objects, and sometimes just a name.
 * In addition, even if we have more than the name, we must ensure that defaults are also included
 *
 * @export
 * @class RunParameters
 * @internal
 */
export declare class RunParamsHelpers extends HasLog {
    constructor(parentLog?: Log);
    /**
     * name or settings adapter to settings
     * @param nameOrSettings
     * @returns settings
     */
    getParamsFromNameOrParams(nameOrSettings: string | CommandParams): CommandParams;
    /**
     * Take a settings-name or partial settings object,
     * and return a full settings object with all defaults from
     * the command definition
     * @param params
     */
    expandParamsWithDefaults(params: CommandParams): CommandParams;
    /**
     * Checks if the run params are complete, as would be used in the $2sxc.cms.run
     * @internal
     */
    static is$sxcRunParams(o: unknown): o is RunParamsWithContext;
    /**
     * Checks if it's at least an instance run param - having at least `action` or `params`
     * @internal
     */
    private static isRunParamsInstance;
    /**
     * @internal
     */
    static ensureRunParamsInstanceOrError(runParams: RunParamsWithContext): void;
}
