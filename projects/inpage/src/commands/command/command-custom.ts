import { CommandNames, Commands } from '..';

/**
 * @internal
 */
const ctxName = 'context';
const evtName = 'event';

const errNoCode = "Trying to run Custom-Code action, but no 'call' (v10+, recommended) or 'customCode' (v9, old) found to run - see console for debug info.";

/**
 * import this module to commands.ts
 * @internal
 */
Commands.add(CommandNames.custom, 'Custom', 'bomb', true, false, {
  code(context, event) {
    return new Promise((resolve, reject) => {
      const actPar = context.button.command.params;
      // the old V9 name
      let code = actPar.customCode;
      // also try the V10 edition - uses `call`
      if (!code) {
        code = actPar.call;
        if (typeof code === 'string' && code.indexOf(' ') === -1 && code.indexOf('(') === -1)
        code += `(${ctxName}, ${evtName})`;
      }
      if (!code) {
        console.warn(errNoCode, actPar);
        alert(errNoCode);
        resolve();
      }
      try {
        const fn = new Function(ctxName, evtName, code);
        resolve(fn(context, event));
      } catch (err) {
        console.error('error in custom button-code: ', actPar);
        reject(err);
      }
    });
  },
});


/**
 * Parameters used for the command `custom` on toolbars.
 * <br>
 * ⤴️ back to [All Command Names](xref:Api.Js.SxcJs.CommandNames)
 */
 export interface CommandCustomParams {
  /**
   * Name of the function to call - must be available in the context.
   * This is usually as a function window. Example:
   * <br>
   * If `call` is `sayHello` you need a `window.sayHello(context, event)`.
   */
  call: string;

  /**
   * **OBSOLETE - avoid using**
   * <br>
   * JavaScript as string containing the code to execute. 
   * This is the old V9 name.
   */
  customCode: string;
}
