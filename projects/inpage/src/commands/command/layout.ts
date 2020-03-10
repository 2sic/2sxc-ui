import { Commands } from '../commands';

/**
 * import this module to commands.ts
 */
Commands.add('layout', 'ChangeLayout', 'glasses', true, true, {
    inlineWindow: (context) => true,
});
