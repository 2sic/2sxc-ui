import { ToolbarRenderer } from '..';
import { TagToolbarManager } from '..';
import { ContextBundleButton } from '../../context/bundles/context-bundle-button';

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
            this.initializeIfNecessary();
            this.show();
        });
        hoverTag.on('mouseleave', (e) => {
            this.initializeIfNecessary();
            // if we hover the menu itself now, don't hide it
            if (!$.contains(this.toolbarElement[0], e.relatedTarget) && this.toolbarElement[0] !== e.relatedTarget)
                this.hide();
        });
    }


    private initializeIfNecessary() {
        if (this.initialized) return;

        const nextFreeId = TagToolbarManager.getNextToolbarId();
        const toolbarId = `${this.context.instance.id}-${this.context.contentBlock.id}-${nextFreeId}`;

        // render toolbar and append tag to body
        this.toolbarElement = $(new ToolbarRenderer(this.context).render());

        this.toolbarElement.on('mouseleave', (e) => {
        // if we do not hover the tag now, hide it
        if (!$.contains(this.hoverTag[0], e.relatedTarget) && this.hoverTag[0] !== e.relatedTarget)
            this.hide();
        });

        $('body').append(this.toolbarElement);

        this.toolbarElement.attr(TagToolbarManager.TagToolbarForAttr, toolbarId);
        this.hoverTag.attr(TagToolbarManager.TagToolbarAttr, toolbarId);

        this.toolbarElement.css({ display: 'none', position: 'absolute', transition: 'top 0.5s ease-out' });

        this.initialized = true;
    }

    private updatePosition() {
        const position = {
            top: 'auto' as string | number,
            left: 'auto' as string | number,
            right: 'auto' as string | number,
            viewportOffset: this.hoverTag[0].getBoundingClientRect().top,
            bodyOffset: TagToolbarManager.getBodyScrollOffset(),
            tagScrollOffset: 0,
            tagOffset: this.hoverTag.offset(),
            tagWidth: this.hoverTag.outerWidth(),
            mousePos: TagToolbarManager.mousePosition,
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
