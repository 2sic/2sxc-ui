
/**
 * The global Tag Toolbar Manager is responsible for the new TagToolbars
 * These have certain shared aspects, like:
 * - a numbering scheme to keep them apart
 * - a mouse tracker to keep track of the position as the toolbar follows the scroll
 */
export class TagToolbarManager {
    /** Mark Dom-Notes with the ID which Tag-Toolbar they want on mouse-over */
    static TagToolbarAttr = 'data-tagtoolbar';

    /** Mark TagToolbar Html-Nodes with the ID of the Dom-Tag they belong to */
    static TagToolbarForAttr = 'data-tagtoolbar-for';

    /** The current mouseposition, always updated when the mouse changes */
    static mousePosition = {
        x: 0,
        y: 0,
    };

    /** The next free ID to mark a TagToolbar */
    static getNextToolbarId() {
        return TagToolbarManager.lastMenuId++;
    }
    private static lastMenuId = 0;

    /**
     * Returns the body offset if positioning is relative or absolute
     */
    static getBodyScrollOffset() {
        const body = $('body');
        const bodyPos = body.css('position');
        if (bodyPos === 'relative' || bodyPos === 'absolute') {
            const offset = body.offset();
            return {
                top: offset.top,
                left: offset.left,
            };
        }
        return {
            top: 0,
            left: 0,
        };
    }

    /**
     * Remove orphan tag-toolbars from DOM
     * This can be necessary if the module was replaced by ajax, 
     * leaving behind un-attached TagToolbars.
     */
    static CleanupOrphanedToolbars() {
        const tagToolbars = $(`[${TagToolbarManager.TagToolbarForAttr}]`);
        tagToolbars.each((i, e) => {
        const id = $(e).attr(TagToolbarManager.TagToolbarForAttr);
        if (!$(`[${TagToolbarManager.TagToolbarAttr}=${id}]`).length) {
            $(e).remove();
        }
        });
    }
}




/**
 * Keep the mouse-position update for future use
 */
$(window).on('mousemove', (e) => {
    TagToolbarManager.mousePosition.x = e.clientX;
    TagToolbarManager.mousePosition.y = e.clientY;
});
