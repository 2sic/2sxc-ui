import { NoJQ } from '../../plumbing';

/**
 * The global Tag Toolbar Manager is responsible for the new TagToolbars
 * These have certain shared aspects, like:
 * - a numbering scheme to keep them apart
 * - a mouse tracker to keep track of the position as the toolbar follows the scroll
 * @internal
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
        const posNoJq = document.body.style.position;
        const body = document.body;
        const bodyPos = posNoJq; // body.css('position');
        if (bodyPos === 'relative' || bodyPos === 'absolute') {
            const offset = NoJQ.offset(body);
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
    static cleanupOrphanedToolbars() {
        const tagToolbars = document.querySelectorAll<HTMLElement>(`[${TagToolbarManager.TagToolbarForAttr}]`);
        tagToolbars.forEach((e) => {
            const id = e.getAttribute(TagToolbarManager.TagToolbarForAttr);
            if (!document.querySelectorAll<HTMLElement>(`[${TagToolbarManager.TagToolbarAttr}="${id}"]`).length) {
                e.remove();
            }
        });
    }
}




/**
 * Keep the mouse-position update for future use
 */
window.addEventListener('mousemove', (e) => {
    TagToolbarManager.mousePosition.x = e.clientX;
    TagToolbarManager.mousePosition.y = e.clientY;
});
