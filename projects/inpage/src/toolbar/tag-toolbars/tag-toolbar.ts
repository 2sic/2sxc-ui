import { TagToolbarManager, ToolbarRenderer } from '..';
import { ContextComplete } from '../../context/bundles/context-bundle-button';
import { Translator } from '../../i18n';
import { NoJQ } from '../../interfaces/no-jquery';
import { TypeFollow } from '../config/toolbar-settings';
import { ToolbarLifecycle } from '../toolbar-lifecycle';

/**
 * This is the modern toolbar which is attached to a tag from whic it hovers.
 * Internally the toolbar Dom-Elements are hidden at the bottom of the page.
 * This object is responsible for creating them,
 * and making sure that hover-events etc. cause the right toolbar to show up.
 */
export class TagToolbar {
    private toolbarElement = null as HTMLElement;
    private initialized = false;
    private follow: TypeFollow;

    /**
     * A Tag-Toolbar which is outside of the module DOM and floating freely
     * @param {HTMLElement} hoverTag
     * @param {ContextComplete} context
     * @param {typeof Translator} [translator] special translator, only included because otherwise WebPack causes circular references
     * @memberof TagToolbar
     */
    constructor(private readonly hoverTag: HTMLElement, private readonly context: ContextComplete, private translator?: typeof Translator) {
        this.follow = context.toolbar.settings.follow;
        // Ensure toolbar gets visible when hovering
        this.addMouseEvents(hoverTag);
    }

    /**
     * Attach Mouse-Enter and Mouse-Leave events to ensure show/hide of the toolbar
     */
    private addMouseEvents(hoverTag: HTMLElement) {
        hoverTag.addEventListener('mouseenter', () => {
            this.initializeIfNecessary();
            this.show();
        });
        hoverTag.addEventListener('mouseleave', (e) => {
            this.initializeIfNecessary();
            // if we hover the menu itself now, don't hide it
            const relatedTarget = e.relatedTarget as HTMLElement;
            if (!this.toolbarElement.contains(relatedTarget) && this.toolbarElement !== relatedTarget)
                this.hide();
        });
    }


    private initializeIfNecessary() {
        if (this.initialized) return;

        const nextFreeId = TagToolbarManager.getNextToolbarId();
        const toolbarId = `${this.context.instance.id}-${this.context.contentBlockReference.id}-${nextFreeId}`;

        // render toolbar and append tag to body
        this.toolbarElement = new ToolbarRenderer(this.context).generate();

        this.toolbarElement.addEventListener('mouseleave', (e) => {
            // if we do not hover the tag now, hide it
            const relatedTarget = e.relatedTarget as HTMLElement;
            if (!this.hoverTag.contains(relatedTarget) && this.hoverTag !== relatedTarget)
                this.hide();
        });

        document.body.append(this.toolbarElement);

        this.toolbarElement.setAttribute(TagToolbarManager.TagToolbarForAttr, toolbarId);
        this.hoverTag.setAttribute(TagToolbarManager.TagToolbarAttr, toolbarId);

        this.toolbarElement.style.display = 'none';
        this.toolbarElement.style.position = 'absolute';
        this.toolbarElement.style.transition = 'top 0.5s ease-out';

        // ensure it's translated
        this.translator?.autoTranslateMenus();
        this.initialized = true;

        // new in v11.12 - toolbar Workflow
        ToolbarLifecycle.raiseToolbarInitEvent(this.toolbarElement, this.hoverTag, this.context);
    }

    private updatePosition(initial: boolean = false) {
        const position = {
            top: 'auto' as 'auto' | number,
            left: 'auto' as 'auto' | number,
            right: 'auto' as 'auto' | number,
            viewportOffset: this.hoverTag.getBoundingClientRect().top,
            bodyOffset: TagToolbarManager.getBodyScrollOffset(),
            tagScrollOffset: 0,
            tagOffset: NoJQ.offset(this.hoverTag),
            tagWidth: NoJQ.outerWidth(this.hoverTag),
            mousePos: TagToolbarManager.mousePosition,
            win: {
                scrollY: window.scrollY,
                width: document.documentElement.clientWidth,
            },
            padding: tagToolbarPadding,
        };

        // If we scrolled down, the toolbar might not be visible - calculate offset
        position.tagScrollOffset = Math.min(position.viewportOffset - position.bodyOffset.top, 0);

        // Update top coordinates
        // new: only do this on initial=true && follow != 'none' or not-initial
        // start by setting default-top
        position.top = position.tagOffset.top + tagToolbarPadding - position.bodyOffset.top;
        const trackMouse = (this.follow === 'always')
            || (this.follow === 'initial' && initial)
            || (this.follow === 'scroll' && position.tagScrollOffset !== 0);
        if (trackMouse)
            position.top = position.mousePos.y + position.win.scrollY - position.bodyOffset.top - toolbarHeight / 2;

        // Update left / right coordinates
        if (this.toolbarElement.classList.contains('sc-tb-hover-right'))
            position.right = position.win.width - position.tagOffset.left - position.tagWidth + tagToolbarPaddingRight - position.bodyOffset.left;
        else
            position.left = position.tagOffset.left + tagToolbarPadding + position.bodyOffset.left;

        this.toolbarElement.style.top = typeof position.top === 'number' ? `${position.top}px` : position.top;
        this.toolbarElement.style.left = typeof position.left === 'number' ? `${position.left}px` : position.left;
        this.toolbarElement.style.right = typeof position.right === 'number' ? `${position.right}px` : position.right;
    }


    /**
     * Hide the toolbar and detach scrolling-watcher
     */
    private hide() {
        this.toolbarElement.style.display = 'none';
        this.disableScrollWatcher();
    }


    /**
     * Show the toolbar
     */
    private show() {
        this.toolbarElement.style.display = 'block';
        this.updatePosition(true);
        this.activateScrollWatcher();
    }

    /** Remember if scrollwatcher has been enabled */
    private watcherActive = false;
    /** The update function as a prebuild function, so it can be reused in on/off */
    private updateFn = () => this.updatePosition();
    /** Enable scroll watcher & remember */
    private activateScrollWatcher() {
        if (this.watcherActive) return;
        const trackOngoing = this.follow === 'scroll' || this.follow === 'always';
        if (!trackOngoing) return;
        window.addEventListener('scroll', this.updateFn);
        if (this.follow === 'always') window.addEventListener('mousemove', this.updateFn);
        this.watcherActive = true;
    }

    /** Disable scroll watcher - if it is active */
    private disableScrollWatcher() {
        if (!this.watcherActive) return;
        window.removeEventListener('scroll', this.updateFn);
        window.removeEventListener('mousemove', this.updateFn);
        this.watcherActive = false;
    }


}

const tagToolbarPadding = 4;
const tagToolbarPaddingRight = 0;
const toolbarHeight = 20;
