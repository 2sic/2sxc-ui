import { ModifierDnnModule } from '.';
import { HasLog } from '../core';
/**
 * module specific stuff
 * @internal
 */
export declare class ModifierDnnModuleInternal extends HasLog {
    constructor(parent: ModifierDnnModule);
    /**
     * Delete a module
     */
    delete(modId: number): Promise<any>;
    /**
     * Create a new module
     */
    create(paneName: string, index: number, type: string): Promise<any>;
    /**
     * Move a DNN Module
     */
    move(modId: number, pane: string, order: number): void;
    getPaneName(pane: HTMLElement): string;
    /**
     * find the correct module id from a list of classes - used on the module-wrapper
     */
    getModuleId(classes: string): number | null;
    getMoveButtons(current: string): HTMLElement;
}
