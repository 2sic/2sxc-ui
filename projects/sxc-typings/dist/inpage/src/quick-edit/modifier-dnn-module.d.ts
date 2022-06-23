import { ModifierBase, Selection } from '.';
/**
 * @internal
 */
export declare class ModifierDnnModule extends ModifierBase {
    private modInternal;
    constructor();
    delete(clip: Selection): Promise<void>;
    move(oldClip: Selection, newClip: Selection): void;
    isRealMove(oldClip: Selection, newClip: Selection): boolean;
    showSendToPane(): void;
    static onModuleButtonClick(): void | Promise<any>;
}
