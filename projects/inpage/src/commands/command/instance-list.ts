import { Commands } from '..';

export const CmdInstanceList = 'instance-list';
/**
 * import this module to commands.ts
 */
Commands.add(CmdInstanceList, 'Sort', 'list-numbered', false, true, {
    showCondition(context) {
        return (
            context.contentBlock.isList &&
            context.button.action.params.useModuleList &&
            context.button.action.params.sortOrder !== -1
        );
    },
});
