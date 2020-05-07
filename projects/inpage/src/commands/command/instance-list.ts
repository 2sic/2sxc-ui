import { Commands, SharedLogic } from '..';

export const CmdInstanceList = 'instance-list';
/**
 * import this module to commands.ts
 */
Commands.add(CmdInstanceList, 'Sort', 'list-numbered', false, true, {
    showCondition: (context) => SharedLogic.isList(context),
});
