import { ContextComplete } from '../context';
/**
 * @internal
 */
export declare type CommandCode = <T>(context: ContextComplete, event: MouseEvent) => Promise<void | T>;
