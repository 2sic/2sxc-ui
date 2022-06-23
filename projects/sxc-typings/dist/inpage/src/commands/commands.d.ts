import { HasLog } from '../core';
import { Button } from '../toolbar/config';
import { Command } from './command';
/**
 * Singleton Catalog of all commands
 * @internal
 */
export declare class Commands extends HasLog {
    /** Singleton */
    static singleton(): Commands;
    private static _singleton;
    static add(name: string, translateKey: string, icon: string, uiOnly: boolean, partOfPage: boolean, more: Partial<Button>): Command;
    static addCommand(command: Command): void;
    private commandList;
    list: Record<string, Command>;
    private constructor();
    get: (name: string) => Command;
    add(name: string, translateKey: string, icon: string, uiOnly: boolean, partOfPage: boolean, more: Partial<Button>): Command;
    addCommand(command: Command): void;
    private addDef;
}
