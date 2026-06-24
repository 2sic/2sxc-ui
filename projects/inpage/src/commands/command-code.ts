import { ContextCompleteWithButton } from '../context';

/**
 * @internal
 */
export type CommandCode = <T>(context: ContextCompleteWithButton, event: MouseEvent, triggeredBy?: string) => Promise<void | T>;
