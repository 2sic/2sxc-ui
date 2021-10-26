import { CommandParams, Commands } from '..';
import { HasLog, Log } from '../../logging';

/**
 * Helper class to process parameters given to the Cms.Run statement
 * Important because certain params may sometimes be full objects, and sometimes just a name.
 * In addition, even if we have more than the name, we must ensure that defaults are also included
 *
 * @export
 * @class RunParameters
 */
export class RunParameters extends HasLog {
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

}
