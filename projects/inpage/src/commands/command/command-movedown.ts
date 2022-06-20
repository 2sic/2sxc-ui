import { CommandNames, Commands, SharedLogic } from '..';
import { Actions } from './content-list-actions';

/**
 * import this module to commands.ts
 * @internal
 */
Commands.add(CommandNames.moveDown, 'MoveDown', 'move-down', false, true, {
    // TODO: do not display if is last item in list
    showCondition: (context) => SharedLogic.isList(context),
    code(context) {
        // TODO: make sure index is never greater than the amount of items
        return Actions.changeOrder(
            context,
            context.button.command.params.sortOrder,
            context.button.command.params.sortOrder + 1,
        );
    },
});

/**
 * Parameters used for the command `moveup` and `movedown`.
 * <br>
 * ⚠️ do not use parameters in custom code, we plan to change the signature.
 * <br>
 * ⤴️ back to [All Command Names](xref:Api.Js.SxcJs.CommandNames)
 */
 export interface CommandMoveParams {
  /**
   * Determins the position where a new item will be added to.
   * <br>
   * ⚠️ This parameter will change soon, don't use it in code. 
   */
  sortOrder: number;

  /**
   * Must be true, to work on the module list. 
   * <br>
   * ⚠️ This parameter will change soon, don't use it in code. 
   */
  useModuleList: true;
}
