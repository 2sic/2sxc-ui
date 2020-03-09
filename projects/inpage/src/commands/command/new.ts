import { CommandBase } from '../command-base';
import { commandOpenNgDialog } from '../command-open-ng-dialog';



/**
 * new is a dialog to add something, and will not add if cancelled
 * new can also be used for mini-toolbars which just add an entity not attached to a module
 * in that case it's essential to add a contentType like
 * <ul class="sc-menu" data-toolbar='{"action":"new", "contentType": "Category"}'></ul>
 *
 * import this module to commands.ts
 */
export class New extends CommandBase {
  constructor() {
    super();
    this.makeDef('new',
      'New',
      'plus',
      false,
      true,
      {
        params: (context) => {
          return { mode: 'new' };
        },
        dialog: (context) => 'edit', // don't use "new" (default) but use "edit"
        showCondition(context) {
          return (!!context.button.action.params.contentType) ||
            ((context.contentBlock.isList) && (context.button.action.params.useModuleList) && (context.button.action.params.sortOrder !== -1)); // don't provide new on the header-item
        },
        code(context, event) {
          // todo - should refactor this to be a toolbarManager.contentBlock command
          Object.assign(context.button.action.params, { sortOrder: context.button.action.params.sortOrder + 1 });
          return commandOpenNgDialog(context, event);
        },
      });
  }
}

// ReSharper disable once UnusedLocals
const cmd = new New();
