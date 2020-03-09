import { CommandBase } from '../command-base';

/**
 * create a metadata toolbar
 *
 * import this module to commands.ts
 */
export class Metadata extends CommandBase {
  constructor() {
    super();
    this.makeDef('metadata',
      'Metadata',
      'tag',
      false,
      false,
      {
        params: (context) => {
          return { mode: 'new' };
        },
        dialog: (context) => 'edit', // don't use "new" (default) but use "edit"
        dynamicClasses(context): string {
          // if it doesn't have data yet, make it less strong
          return context.button.action.params.entityId ? '' : 'empty';
          // return settings.items && settings.items[0].entityId ? "" : "empty";
        },
        showCondition(context) {
          return (!!context.button.action.params.metadata);
        }, // only add a metadata-button if it has metadata-infos
        configureCommand(context, command) {
          const itm = {
            Title: 'EditFormTitle.Metadata',
            Metadata: Object.assign({ keyType: 'string', targetType: 10 }, command.context.button.action.params.metadata),
          };
          Object.assign(command.items[0], itm);
        },
      });
  }
}

// ReSharper disable once UnusedLocals
const cmd = new Metadata();
