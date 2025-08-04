import { CommandNames, Commands } from '..';

/**
 * This is a dummy command to just log a message.
 * It's not meant to show in the toolbar, but it should be callable on $2sxc(...).cms.run({ action: 'log', params: { message: 'hello' } })
 * 
 * import this module to commands.ts
 * @internal
 */
Commands.add(CommandNames.log, 'Log', 'bomb', true, false, {

  code(context, _event) {
    console.log('command: log (message/context)', context.button.command.params.message, context);
    return new Promise((_resolve, _reject) => {});
  },

  noItems: true,
});

// Test code
// Debug.log("CommandLog loaded 🎉");

// window.setTimeout(() => {
//   Debug.log("CommandLog timeout 🎉");
//   window.$2sxc(12062).cms.run({ action: 'log' as any, params: { message: 'hello' } });
// }, 100);