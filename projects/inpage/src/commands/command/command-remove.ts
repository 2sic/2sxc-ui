import { CommandNames, Commands, SharedLogic } from '..';
import { translate } from '../../i18n';
import { Actions } from './content-list-actions';

/**
 * remove an item from the placeholder (usually for lists)
 *
 * import this module to commands.ts
 * @internal
 */
Commands.add(CommandNames.remove, 'Remove', 'minus-circled', false, true, {
    showCondition: (context) => SharedLogic.isList(context),
    code(context) {
        return new Promise((resolve, reject) => {
            if (confirm(translate('Toolbar.ConfirmRemove')))
                return Actions.removeFromList(context);
            return resolve();
        });
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
