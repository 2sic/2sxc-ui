import { ContextComplete } from '../context';

/**
 * @internal
 */
export type CommandCode = <T>(context: ContextComplete, event: MouseEvent, triggeredBy?: string) => Promise<void | T>;
