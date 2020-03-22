﻿import { Commands } from '..';

export const CmdItemHistory = 'item-history';

/**
 * show the version dialog
 *
 * import this module to commands.ts
 */
Commands.add(CmdItemHistory, 'ItemHistory', 'clock', true, false, {
    inlineWindow: (context) => true,
    fullScreen: (context) => true,
});
