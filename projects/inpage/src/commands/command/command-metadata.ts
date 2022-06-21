import { Command, CommandNames, CommandParamsEntityById, Commands } from '..';
import { CommandParamsMetadata, ItemIdentifierSimple } from '../../../../$2sxc/src/cms';
import { CommandContentTypeParams } from './command-content-type';

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


/**
 * Parameters used for the command `metadata`.
 * <br>
 * Will do either one of these:
 * - if it has an `entityId`, will just open `edit` for that Entity
 * - if it has no `entityId`, will open `new` for the current `contentType`
 * and assign to the target specified by `metadata`:
 * <br>
 * ⤴️ back to [All Command Names](xref:Api.Js.SxcJs.CommandNames)
 */
export interface CommandMetadataParams extends CommandContentTypeParams, CommandParamsEntityById {
  /**
   * Target to assign the metadata to.
   */
  metadata: CommandParamsMetadata;
}
