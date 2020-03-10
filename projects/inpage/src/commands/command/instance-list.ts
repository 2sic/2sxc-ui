import { Commands } from '../commands';

/**
 * import this module to commands.ts
 */
Commands.add('instance-list', 'Sort', 'list-numbered', false, true, {
    showCondition(context) {
        return (
            context.contentBlock.isList &&
            context.button.action.params.useModuleList &&
            context.button.action.params.sortOrder !== -1
        );
    },
});
