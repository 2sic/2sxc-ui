import { Commands } from '../commands';

export const CmdCustom = 'custom';
const ctxName = 'context';
const evtName = 'event';

const errNoCode = 'Trying to run Custom-Code action, but no customCode found to run - see console for debug info.';

/**
 * import this module to commands.ts
 */
Commands.add(CmdCustom, 'Custom', 'bomb', true, false, {
    code(context, event) {
        return new Promise((resolve, reject) => {
            const actPar = context.button.command.params;
            if (!actPar.customCode) {
                console.warn(errNoCode, actPar);
                alert(errNoCode);
                resolve();
            }
            try {
                const fn = new Function(ctxName, evtName, actPar.customCode);
                resolve(fn(context, event));
            } catch (err) {
                console.error('error in custom button-code: ', actPar);
                reject(err);
            }
        });
    },
});
