import { ContextOfButton } from '../context/context-of-button';
import { windowInPage as window } from '../interfaces/window-in-page';
import { DialogPaths as Dialog } from '../settings/DialogPaths';
import { Command } from './command';

/**
 * assemble an object which will store the configuration and execute it
 */
export function commandCreate(context: ContextOfButton): Command {

  const ngDialogUrl = context.instance.sxcRootUrl +
    'desktopmodules/tosic_sexycontent/' +
    ((context.ui.form === 'ng8' && context.button.dialog(context) === 'edit') ? Dialog.ng8 : Dialog.ng1) +
    '?sxcver=' + context.instance.sxcVersion;

  const debugUrlParam: string = window.$2sxc.urlParams.get('debug') ? '&debug=true' : '';

  const cmd = new Command(context, ngDialogUrl, debugUrlParam);

  return cmd;
}
