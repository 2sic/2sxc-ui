import { ContextComplete } from '../context';

/**
 * @internal
 */
export type CommandCode = <T>(context: ContextComplete, event: MouseEvent) => Promise<void | T>;
