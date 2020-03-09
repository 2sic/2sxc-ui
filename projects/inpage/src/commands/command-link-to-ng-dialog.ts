import { ContextOfButton } from '../context/context-of-button';
import { commandCreate } from './command-create';

/**
 * create a dialog link
 * @param sxc
 * @param specialSettings
 */
export function commandLinkToNgDialog(context: ContextOfButton): string {
  const cmd = commandCreate(context);

  if (cmd.context.button.action.params.useModuleList) {
    cmd.addContentGroupItemSetsToEditList(true);
  } else {
    cmd.addSimpleItem();
  };

  // if the command has own configuration stuff, do that now
  if (cmd.context.button.configureCommand) {
    cmd.context.button.configureCommand(context, cmd);
  }

  return cmd.generateLink(context);
}
