import { Commands } from '../commands';

/**
 * show the version dialog
 *
 * import this module to commands.ts
 */
Commands.add('item-history', 'ItemHistory', 'clock', true, false, {
    inlineWindow: (context) => true,
    fullScreen: (context) => true,
});
