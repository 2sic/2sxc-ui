import { CommandDefinition, CommandNames, Commands } from '..';
import { ItemIdentifierSimple } from '../../../../$2sxc/src/cms/item-identifiers';
import { ButtonDefinition } from '../../toolbar/config/button';

const MetadataDefaultKeyType = 'string';
const MetadataDefaultTargetType = 10; // cms-item

/**
 * This is the shared structure of both metadata and image-metadata commands
 * @internal
 */
const metadataSharedParts : Partial<ButtonDefinition> = {

  parameters: (_) => ({ mode: CommandNames.newMode }),

  dialog: (_) => CommandNames.edit, // don't use "new" (default) but use "edit"

  // if it doesn't have data yet, make it less strong
  dynamicClasses: (ctx) => ctx.button.command.params.entityId ? '' : 'empty',

  // only add a metadata-button if it has metadata-infos
  showCondition: (ctx) => !!ctx.button.command.params.metadata,

  // configureLinkGenerator(_, linkGenerator) {
  //   const itm: Partial<ItemIdentifierSimple> = {
  //     Metadata: {
  //       ...{ keyType: MetadataDefaultKeyType, targetType: MetadataDefaultTargetType },
  //       ...linkGenerator.context.button.command.params.metadata },
  //   };
  //   linkGenerator.items[0] = {...linkGenerator.items[0], ...itm };
  // },

  customItems: (ctx, items) => {
    const itm: Partial<ItemIdentifierSimple> = {
      Metadata: {
        ...{ keyType: MetadataDefaultKeyType, targetType: MetadataDefaultTargetType },
        ...ctx.button.command.params.metadata },
    };
    return [ {...items[0], ...itm }, ...items.slice(1)];
  },

  // We need the items, they will contain the metadata
  noItems: false,
};

/**
 * create a metadata toolbar
 *
 * import this module to commands.ts
 * @internal
 */
const metadata = CommandDefinition.build(CommandNames.metadata, 'Metadata', 'tag', false, false, metadataSharedParts);

/**
 * @internal
 */
const imageMetadata = CommandDefinition.build(CommandNames.image, 'Image', 'focus', false, false, {
  ...metadataSharedParts,
  classes: 'single-field',
});

Commands.addCommand(metadata);
Commands.addCommand(imageMetadata);

