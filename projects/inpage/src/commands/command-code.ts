import { ContextOfButton } from '../context';

export type CommandCode = <T>(context: ContextOfButton, event: MouseEvent) => Promise<void | T>;
