import { ContextComplete } from '../context';

export type CommandCode = <T>(context: ContextComplete, event: MouseEvent) => Promise<void | T>;
