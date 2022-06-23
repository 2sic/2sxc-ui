/**
 * The global Tag Toolbar Manager is responsible for the new TagToolbars
 * These have certain shared aspects, like:
 * - a numbering scheme to keep them apart
 * - a mouse tracker to keep track of the position as the toolbar follows the scroll
 * @internal
 */
export declare class TagToolbarManager {
    /** Mark Dom-Notes with the ID which Tag-Toolbar they want on mouse-over */
    static TagToolbarAttr: string;
    /** Mark TagToolbar Html-Nodes with the ID of the Dom-Tag they belong to */
    static TagToolbarForAttr: string;
    /** The current mouseposition, always updated when the mouse changes */
    static mousePosition: {
        x: number;
        y: number;
    };
    /** The next free ID to mark a TagToolbar */
    static getNextToolbarId(): number;
    private static lastMenuId;
    /**
     * Returns the body offset if positioning is relative or absolute
     */
    static getBodyScrollOffset(): {
        top: number;
        left: number;
    };
    /**
     * Remove orphan tag-toolbars from DOM
     * This can be necessary if the module was replaced by ajax,
     * leaving behind un-attached TagToolbars.
     */
    static CleanupOrphanedToolbars(): void;
}
