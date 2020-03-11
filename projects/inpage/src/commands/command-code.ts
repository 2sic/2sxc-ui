import { ContextBundleButton } from '../context';

export type CommandCode = <T>(context: ContextBundleButton, event: MouseEvent) => Promise<void | T>;
