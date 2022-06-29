import { Command, CommandNames, Commands } from '..';

/**
 * @internal
 */
const paramsName = 'params';
const ctxName = 'context';
const evtName = 'event';

const errPrefix = "Running 'code' command, ";
const errNoCode = `${errPrefix}but no 'call' found to run - see console for debug info.`;
const errCodeNotString = `${errPrefix}but 'call' doesn't seem to be a string.`;
/**
 * import this module to commands.ts
 * This is only available in v14+, before it was called 'custom' and that still exists
 * @internal
 */
const cmd = Command.build(CommandNames.code, 'Custom', 'bomb', true, false, {
  code(context, event) {
    return new Promise((resolve, reject) => {
      const params = context.button.command.params;

      function errAndResolve(message: string) {
        console.warn(message, params);
        alert(message + '\n See console for details.');
        resolve();
      }

      let code = params.call;
      if (!code) return errAndResolve(errNoCode);
      if (typeof code !== 'string') return errAndResolve(errCodeNotString);
      if (code.indexOf('(') !== -1 || code.indexOf(' ') !== -1)
        return errAndResolve(`${errPrefix}but 'call' contained '(' or ' ' characters - not allowed.`);

      // Make it a signature for the (not good) Function structure
      code += `(${paramsName}, ${ctxName}, ${evtName})`;

      // new signature v14.04 when using 'code' has params first, old had context first

      // 1. clean params from all functions which were added by code in the entire pipeline
      const clean = {} as Record<string, unknown>;
      Object.entries(params).forEach(([k, v]) => { if (typeof v !== 'function') clean[k] = v; });
      const { action, call, ...cleanest } = clean;  // remove 'action' and 'call'

      try {
        // Todo: rework to not use 'Function' - use turnOn concept
        const fnNew = new Function(paramsName, ctxName, evtName, code);
        resolve(fnNew(cleanest, context, event));
      } catch (err) {
        console.error('error in custom button-code: ', params);
        reject(err);
      }
    });
  },
});

Commands.addCommand(cmd);

