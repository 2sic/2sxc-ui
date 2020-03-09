import { contentItems } from '../../entity-manipulation/item-commands';
import { CommandBase } from '../command-base';

/**
 * todo: work in progress related to https://github.com/2sic/2sxc/issues/618
 *
 * import this module to commands.ts
 */
export class Delete extends CommandBase {
  constructor() {
    super();
    this.makeDef('delete',
      'Delete',
      'cancel',
      true,
      false,
      {
        // disabled: true,
        showCondition(context) {
          // can never be used for a modulelist item, as it is always in use somewhere
          if (context.button.action.params.useModuleList) {
            return false;
          }

          // check if all data exists required for deleting
          return ((!!context.button.action.params.entityId)
            && (!!context.button.action.params.entityGuid)
            && (!!context.button.action.params.entityTitle));
        },
        code(context) {
          return contentItems.delete(context,
            context.button.action.params.entityId,
            context.button.action.params.entityGuid,
            context.button.action.params.entityTitle);
        },
      });
  }
}

// ReSharper disable once UnusedLocals
const cmd = new Delete();
