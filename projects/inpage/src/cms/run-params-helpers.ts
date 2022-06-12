import { Sxc } from '../../../$2sxc/src/';
import { ContextIdentifier } from '../../../$2sxc/src/sxc-global/context-identifier';
import { CommandParams, Commands } from '../commands';
import { HasLog, Log } from '../logging';
import { RunParams, RunParamsWithContext } from '../../../$2sxc/src/cms';

/**
 * Helper class to process parameters given to the Cms.Run statement
 * Important because certain params may sometimes be full objects, and sometimes just a name.
 * In addition, even if we have more than the name, we must ensure that defaults are also included
 *
 * @export
 * @class RunParameters
 * @internal
 */
export class RunParamsHelpers extends HasLog {
    constructor(parentLog?: Log) {
        super('Cmd.RunPrm', parentLog, 'start');
    }

    /**
     * name or settings adapter to settings
     * @param nameOrSettings
     * @returns settings
     */
    public getParamsFromNameOrParams(nameOrSettings: string | CommandParams): CommandParams {
        const cl = this.log.call('getParamsFromNameOrParams', `${nameOrSettings}`);
        // check if nameOrString is name (string) or object (settings)
        const nameIsString = typeof nameOrSettings === 'string';
        cl.add(`adapting settings; name string: ${nameIsString}; name = ${nameOrSettings}`);
        const result = (nameIsString
            ? { action: nameOrSettings }
            : nameOrSettings) as CommandParams;
        return cl.return(result);
    }

    /**
     * Take a settings-name or partial settings object,
     * and return a full settings object with all defaults from
     * the command definition
     * @param params
     */
    public expandParamsWithDefaults(params: CommandParams): CommandParams {
        const cl = this.log.call('expandParamsWithDefaults');
        const name = params.action;
        cl.add(`will add defaults for ${name} from buttonConfig`);
        const defaults = Commands.singleton().get(name).buttonDefaults;
        cl.data('defaults to merge', defaults);
        // TODO: 2dm - suspicious cast
        // merge conf & settings, but...?
        return cl.return({...defaults, ...params} as CommandParams);
    }


    // ----- Static Helpers -----
    /**
     * Checks if the run params are complete, as would be used in the $2sxc.cms.run
     * @internal
     */
    static is$sxcRunParams(o: unknown): o is RunParamsWithContext {
        const t = o as RunParamsWithContext;
        return (t.tag != null || (t.context != null && (ContextIdentifier.is(t.context) || Sxc.is(t.context)))) &&
        RunParamsHelpers.isRunParamsInstance(t);
    }

    /**
     * Checks if it's at least an instance run param - having at least `action` or `params`
     * @internal
     */
    private static isRunParamsInstance(maybeRunParams: unknown): maybeRunParams is RunParams {
        const typed = maybeRunParams as RunParams;
        return (typed.action != null || typed.params != null);
    }

    /**
     * @internal
     */
    static ensureRunParamsInstanceOrError(runParams: RunParamsWithContext) {
        if (!RunParamsHelpers.isRunParamsInstance(runParams))
        throw `${errPrefix} with at least ${runContextInstanceMinimalRequirements}`;
        if (runParams.context)
        throw `${errPrefix} without 'context' since it already provides the context`;
    }
}


const runContextInstanceMinimalRequirements = "'action' and/or 'params'";
const errPrefix = 'sxc instance run() expects runParams';
