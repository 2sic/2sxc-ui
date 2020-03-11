import { ContextBundleButton } from '../context/bundles/context-bundle-button';
import { ToolbarRenderer } from './render/toolbar-renderer';

/**
 * This is the modern toolbar which is attached to a tag from whic it hovers.
 * Internally the toolbar Dom-Elements are hidden at the bottom of the page.
 * This object is responsible for creating them,
 * and making sure that hover-events etc. cause the right toolbar to show up.
 */
export class TagToolbar {
    private toolbarElement = null as JQuery;
    private initialized = false;

    constructor(private readonly hoverTag: JQuery, private readonly context: ContextBundleButton) {
        // Ensure toolbar gets visible when hovering
        this.addMouseEvents(hoverTag);
    }

    /**
     * Attach Mouse-Enter and Mouse-Leave events to ensure show/hide of the toolbar
     */
    private addMouseEvents(hoverTag: JQuery) {
        hoverTag.on('mouseenter', () => {
            this.initialize();
            this.show();
        });
        hoverTag.on('mouseleave', (e) => {
            this.initialize();
            // if we hover the menu itself now, don't hide it
            if (!$.contains(this.toolbarElement[0], e.relatedTarget) && this.toolbarElement[0] !== e.relatedTarget)
                this.hide();
        });
    }

    /**
     * Remove orphan tag-toolbars from DOM
     * This can be necessary if the module was replaced by ajax, 
     * leaving behind un-attached TagToolbars.
     */
    static CleanupOrphanedToolbars() {
        const tagToolbars = $(`[${tagToolbarForAttr}]`);
        tagToolbars.each((i, e) => {
        const id = $(e).attr(tagToolbarForAttr);
        if (!$(`[${tagToolbarAttr}=${id}]`).length) {
            $(e).remove();
        }
        });
    }


    private initialize() {
        if (this.initialized) return;

        const toolbarId = `${this.context.instance.id}-${this.context.contentBlock.id}-${getMenuNumber()}`;

        // render toolbar and append tag to body
        this.toolbarElement = $(new ToolbarRenderer(this.context).render());

        this.toolbarElement.on('mouseleave', (e) => {
        // if we do not hover the tag now, hide it
        if (!$.contains(this.hoverTag[0], e.relatedTarget) && this.hoverTag[0] !== e.relatedTarget)
            this.hide();
        });

        $('body').append(this.toolbarElement);

        this.toolbarElement.attr(tagToolbarForAttr, toolbarId);
        this.hoverTag.attr(tagToolbarAttr, toolbarId);

        this.toolbarElement.css({ display: 'none', position: 'absolute', transition: 'top 0.5s ease-out' });

        this.initialized = true;
    }

    private updatePosition() {
        const position = {
            top: 'auto' as string | number,
            left: 'auto' as string | number,
            right: 'auto' as string | number,
            viewportOffset: this.hoverTag[0].getBoundingClientRect().top,
            bodyOffset: getBodyOffset(),
            tagScrollOffset: 0,
            tagOffset: this.hoverTag.offset(),
            tagWidth: this.hoverTag.outerWidth(),
            mousePos: mousePosition,
            win: {
                scrollY: window.scrollY,
                width: $(window).width(),
            },
            padding: tagToolbarPadding,
        };

        // If we scrolled down, the toolbar might not be visible - calculate offset
        position.tagScrollOffset = Math.min(position.viewportOffset - position.bodyOffset.top, 0);

        // Update top coordinates
        if (position.tagScrollOffset === 0)
            position.top = position.tagOffset.top + tagToolbarPadding - position.bodyOffset.top;
        else
            position.top = position.mousePos.y + position.win.scrollY - position.bodyOffset.top - toolbarHeight / 2;

        // Update left / right coordinates
        // todo: try to change class to use attribute or something
        if (this.toolbarElement.hasClass('sc-tb-hover-right'))
            position.right = position.win.width - position.tagOffset.left - position.tagWidth + tagToolbarPaddingRight - position.bodyOffset.left;
        else
            position.left = position.tagOffset.left + tagToolbarPadding + position.bodyOffset.left;

        const cssPos = {
            top: position.top,
            left: position.left,
            right: position.right,
        };

        this.toolbarElement.css(cssPos);
    }


    /**
     * Hide the toolbar and detach scrolling-watcher
     */
    private hide() {
        $(window).off('scroll', () => this.updatePosition());
        this.toolbarElement.css({ display: 'none' });
    }


    /**
     * Show the toolbar and attach scrolling watcher
     */
    private show() {
        this.toolbarElement.css({ display: 'block' });
        $(window).on('scroll', () => this.updatePosition());
        this.updatePosition();
    }

}

const tagToolbarPadding = 4;
const tagToolbarPaddingRight = 0;
const toolbarHeight = 20;
const tagToolbarAttr = 'data-tagtoolbar';
const tagToolbarForAttr = 'data-tagtoolbar-for';

/**
 * Returns the body offset if positioning is relative or absolute
 */
function getBodyOffset() {
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
 * Number generator used for TagToolbars
 */
let lastMenuId = 0;
function getMenuNumber() {
  return lastMenuId++;
}


/** The current mouseposition, always updated when the mouse changes */
const mousePosition = {
  x: 0,
  y: 0,
};

/**
 * Keep the mouse-position update for future use
 */
$(window).on('mousemove', (e) => {
  mousePosition.x = e.clientX;
  mousePosition.y = e.clientY;
});

