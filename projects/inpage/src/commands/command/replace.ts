import { Commands } from '../commands';

/**
 * import this module to commands.ts
 */
Commands.add('replace', 'Replace', 'replace', false, true, {
    showCondition(context) {
        return context.button.action.params.useModuleList;
    },
});
