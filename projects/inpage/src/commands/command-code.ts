import { ContextCompleteWithButton } from '../context';

/**
 * Signature of a command code; returning a promise.
 * @public
 */
export type CommandCode = <T>(context: ContextCompleteWithButton, event: MouseEvent, triggeredBy?: string) => Promise<void | T>;
