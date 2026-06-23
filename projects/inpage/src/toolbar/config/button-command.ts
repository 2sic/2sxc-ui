import { CommandDefinition, CommandNames, CommandParams, Commands } from '../../commands';
import { TypeValue } from '../../plumbing';
import { BuildRule } from '../rules/rule';

/**
 * @internal
 */
export interface CommandWithParams {
    readonly commandDef: CommandDefinition; // reference to original definition which should run
    name: CommandNames;
    params?: CommandParams;

    // constructor(public name: CommandNames, public params?: CommandParams) {
    //     if (!params)
    //         this.params = {};
    //     this.commandDef = Commands.singleton().get(name); // activate command for this
    // }
}

export function createCmdWithParams(name: CommandNames, params?: CommandParams): CommandWithParams {
    return {
        params: params ?? {},
        name,
        commandDef: Commands.singleton().get(name)
    } satisfies CommandWithParams;
}

export class BtnCmdHelpers {

    /** make static, as many ButtonCommand signatures are actually not objects */
    static mergeAdditionalParams(command: CommandWithParams, additionalParams: Record<string, TypeValue>): CommandParams {
        // 2026-06-20 2dm - trying to make this cleaner and more obvious
        let params: CommandParams = {
          ...(command?.name ? { action: command.name } : {}),
          ...(command?.params ?? {}),
          ...additionalParams
        };

        // 2026-06-20 before
        // let params: CommandParams = {};
        // if (command) {
        //     if (command.name)
        //         params.action = command.name;
        //     if (command.params)
        //         params = {...params, ...command.params, ...additionalParams};
        // }

        // 2026-06-20 2dm
        // This is not ideal, it has a side effect as it's modifying the original command.params.
        // According to my analysis, after the merge certain methods will be called that may use the command.params
        // in a very deep location, such as checking if a button should be enabled etc.
        // So it seems necessary to preserve this, but the flow of the code should possibly be improved to make it more obvious that this is a side effect.
        command.params = params;
        return params;
    }

    static mergeParamsWithRulesAndClean(command: CommandWithParams, rule: BuildRule | null): CommandParams {

        // 2026-06-20 2dm: Special early clean-up of conflicting identifiers
        // Edge case: in some cases we can have conflicting identifiers
        // One from the button / rule itself, one from the context (toolbar main)
        // In this case, it could cause trouble down the road,
        // as it may try to edit both the item "2345" as well as the "child 0000-0000-0000" of a parent.
        // This would result in the edit working, but the parent also getting modified, so we must prevent this.
        
        // Note that this changes the underlying command.params, which is a side-effect
        // but it's by design and kind of necessary (see method above)
        const cp = command?.params;
        const rp = rule?.params;
        if (cp?.parent && rp?.entityId) {
            delete(cp.parent);
            delete(cp.fields);
            delete(cp.index);
            delete(cp.entityGuid);
            delete(cp.contentType);
        }

        // Run pre-clean if the button needs it
        // new 2026-06-22 2dm for add-existing to prevent inheriting contentType from the main toolbar definition
        const preClean = command.commandDef.buttonDefaults.preCleanSharedParams;
        if (command.params && preClean)
            command.params = preClean(command.params);

        let params = BtnCmdHelpers.mergeAdditionalParams(command, rule?.params ?? {});

        // Also add settings, if provided by the rule.
        params = {
          ...params,
          ...(rule?.settings ? { settings: rule.settings } : {})
        };


        return params;
    }
}