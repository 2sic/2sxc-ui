import { Command, CommandNames, Commands } from '..';
import { ItemIdentifierSimple } from '../../../../$2sxc/src/cms';

const MetadataDefaultKeyType = 'string';
const MetadataDefaultTargetType = 10; // cms-item
/**
 * create a metadata toolbar
 *
 * import this module to commands.ts
 * @internal
 */
export const MetadataCommand = Command.build(CommandNames.metadata, 'Metadata', 'tag', false, false, {

  addParamsToLink: (_) => ({ mode: CommandNames.newMode }),

  dialog: (_) => CommandNames.edit, // don't use "new" (default) but use "edit"

  // if it doesn't have data yet, make it less strong
  dynamicClasses: (ctx) => ctx.button.command.params.entityId ? '' : 'empty',

  // only add a metadata-button if it has metadata-infos
  showCondition: (ctx) => !!ctx.button.command.params.metadata,

  configureLinkGenerator(_, linkGenerator) {
    const itm: Partial<ItemIdentifierSimple> = {
      Metadata: {
        ...{ keyType: MetadataDefaultKeyType, targetType: MetadataDefaultTargetType },
        ...linkGenerator.context.button.command.params.metadata },
    };
    linkGenerator.items[0] = {...linkGenerator.items[0], ...itm };
  },
});

/**
 * @internal
 */
export const ImageMetadataCommand = Command.build(CommandNames.image, 'Image', 'focus', false, false, {
  addParamsToLink: MetadataCommand.buttonDefaults.addParamsToLink,
  dialog: MetadataCommand.buttonDefaults.dialog,
  classes: 'single-field',
  dynamicClasses: MetadataCommand.buttonDefaults.dynamicClasses,
  showCondition: MetadataCommand.buttonDefaults.showCondition,
  configureLinkGenerator: MetadataCommand.buttonDefaults.configureLinkGenerator,
});

Commands.addCommand(MetadataCommand);
Commands.addCommand(ImageMetadataCommand);

