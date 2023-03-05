import { CommandNames, Commands } from '..';
import { ContextComplete } from '../../context/bundles/context-bundle-button';


function openLink(context: ContextComplete, event: MouseEvent) {
  var link = context.button.command.params?.link as string;
  if (!link) {
    alert('no link specified on the params');
    return Promise.resolve();
  }
  window.open(link, '_blank');
  return Promise.resolve();
}

/**
 * import this module to commands.ts
 * @internal
 */
Commands.add(CommandNames.help, 'Help', 'help', true, false, {
  code: openLink,
});

Commands.add(CommandNames.link, 'Link', 'link', true, false, {
  code: openLink,
});
