import { Commands } from '..';

export const CmdReplace = 'replace';
/**
 * import this module to commands.ts
 */
Commands.add(CmdReplace, 'Replace', 'replace', false, true, {
    showCondition(context) {
        return context.button.action.params.useModuleList;
    },
});
