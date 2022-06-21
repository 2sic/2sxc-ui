import { CommandNames, Commands } from '..';
import { CommandContentTypeParams } from './command-content-type';
import { Actions } from './content-list-actions';
import { SharedLogic } from './shared-logic';

/**
 * add brings no dialog, just add an empty item
 *
 * import this module to commands.ts
 * @internal
 */
Commands.add(
  CommandNames.add,
  'AddDemo',
  'plus-circled',
  false,
  true,
  {
    showCondition: (context) => SharedLogic.isList(context),
    code(context) {
      return Actions.addItem(context, context.button.command.params.sortOrder + 1);
    },
  },
);

/**
 * Parameters used for the command `add`.
 * <br>
 * The contentType name determines what items will be created.
 * <br>
 * ⤴️ back to [All Command Names](xref:Api.Js.SxcJs.CommandNames)
 */
export interface CommandAddParams extends CommandContentTypeParams {
  /**
   * Determins the position where a new item will be added to.
   */
  sortOrder: number;
}
