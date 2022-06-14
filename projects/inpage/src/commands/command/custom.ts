import { Commands } from '../commands';

/**
 * @internal
 */
export const CmdCustom = 'custom';
const ctxName = 'context';
const evtName = 'event';

const errNoCode = "Trying to run Custom-Code action, but no 'customCode' (v9) or 'call' (v10) found to run - see console for debug info.";

/**
 * import this module to commands.ts
 * @internal
 */
Commands.add(CmdCustom, 'Custom', 'bomb', true, false, {
    code(context, event) {
        return new Promise((resolve, reject) => {
            const actPar = context.button.command.params;
            // the old V9 name
            let code = actPar.customCode;
            // also try the V10 edition
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
