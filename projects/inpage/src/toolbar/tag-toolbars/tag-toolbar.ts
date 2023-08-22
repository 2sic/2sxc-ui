import { TagToolbarManager, ToolbarRenderer } from '..';
import { ContextComplete } from '../../context/bundles/context-bundle-button';
import { Translator } from '../../i18n';
import { NoJQ } from '../../plumbing';
import { TLB_FOLLOW_ALWAYS, TLB_FOLLOW_INITIAL, TLB_FOLLOW_SCROLL, TLB_SHOW_ALWAYS, TypeFollow, TLB_HOV_RIGHT, TLB_HOV_MID, TlbHoverPrefix } from '../config/toolbar-settings';
import { ToolbarLifecycle } from '../toolbar-lifecycle';

const TagToolbarPadding = 4;
const TagToolbarPaddingRight = 0;
const ToolbarHeight = 20;

/**
 * This is the modern toolbar which is attached to a tag from which it hovers.
 * Internally the toolbar Dom-Elements are hidden at the bottom of the page.
 * This object is responsible for creating them,
 * and making sure that hover-events etc. cause the right toolbar to show up.
 * @internal
 */
export class TagToolbar {
  private toolbarElement = null as HTMLElement;
  private initialized = false;
  private follow: TypeFollow;
  private alwaysShow = false;
  private delayShow = 0;

  /**
   * A Tag-Toolbar which is outside of the module DOM and floating freely
   * @param {HTMLElement} hoverTag
   * @param {ContextComplete} context
   * @param {typeof Translator} [translator] special translator, only included because otherwise WebPack causes circular references
   */
  constructor(private readonly hoverTag: HTMLElement, private readonly context: ContextComplete, private translator?: typeof Translator) {
    const settings = context.toolbar.settings;
    this.follow = settings.follow;
    this.alwaysShow = settings.show === TLB_SHOW_ALWAYS;
    this.delayShow = settings.delayShow ?? 0;
console.log('2dm: delayShow', this.delayShow);

    // Ensure toolbar gets visible when hovering
    this.addMouseEvents(hoverTag);
    if (this.alwaysShow) this.showPermanently();
  }

  /**
   * Attach Mouse-Enter and Mouse-Leave events to ensure show/hide of the toolbar
   */
  private addMouseEvents(hoverTag: HTMLElement) {
    hoverTag.addEventListener('mouseenter', () => {
      if (this.delayShow == 0) this.show();
      else this.delayShowTimeout = setTimeout(() => { this.show();}, this.delayShow);
    });
    if (!this.alwaysShow)
      hoverTag.addEventListener('mouseleave', (e) => {
        // new 16.04
        if (this.delayShowTimeout) clearTimeout(this.delayShowTimeout);

        // note: not sure why this is here, but it's probably needed
        this.initializeIfNecessary();
        // if we hover the menu itself now, don't hide it
        const relatedTarget = e.relatedTarget as HTMLElement;
        if (!this.toolbarElement.contains(relatedTarget) && this.toolbarElement !== relatedTarget)
          this.hide();
      });
  }
  private delayShowTimeout: ReturnType<typeof setTimeout> = null;

  private initializeIfNecessary() {
    if (this.initialized) return;

    const nextFreeId = TagToolbarManager.getNextToolbarId();
    const toolbarId = `${this.context.instance.id}-${this.context.contentBlockReference.id}-${nextFreeId}`;

    // render toolbar and append tag to body
    this.toolbarElement = new ToolbarRenderer(this.context).generate();

    // 2021-11-15 2dm disabled this, seems like a duplicate to the attach-mouse-enter which always runs
    if (!this.alwaysShow)
      this.toolbarElement.addEventListener('mouseleave', (e) => {
        // if we do not hover the tag now, hide it
        const relatedTarget = e.relatedTarget as HTMLElement;
        if (!this.hoverTag.contains(relatedTarget) && this.hoverTag !== relatedTarget)
          this.hide();
      });

    document.body.append(this.toolbarElement);

    this.toolbarElement.setAttribute(TagToolbarManager.TagToolbarForAttr, toolbarId);
    this.hoverTag.setAttribute(TagToolbarManager.TagToolbarAttr, toolbarId);

    const toolbarStyle = this.toolbarElement.style;
    toolbarStyle.position = 'absolute';
    // Do the following things on toolbars which are invisible (show != always)
    if (!this.alwaysShow) {
      toolbarStyle.display = 'none';
      toolbarStyle.transition = 'top 0.5s ease-out';
    }

    // ensure it's translated
    this.translator?.autoTranslateMenus();
    this.initialized = true;

    // new in v11.12 - toolbar Workflow
    ToolbarLifecycle.raiseToolbarInitEvent(this.toolbarElement, this.hoverTag, this.context);
  }

  private updatePosition(initial: boolean) {
    const position = {
      top: 'auto' as 'auto' | number,
      left: 'auto' as 'auto' | number,
      right: 'auto' as 'auto' | number,
      viewportOffset: this.hoverTag.getBoundingClientRect().top,
      bodyOffset: TagToolbarManager.getBodyScrollOffset(),
      tagScrollOffset: 0,
      tagOffset: NoJQ.offset(this.hoverTag),
      tagWidth: this.hoverTag.offsetWidth,
      tagHeight: this.hoverTag.offsetHeight,
      mousePos: TagToolbarManager.mousePosition,
      win: {
          scrollY: window.scrollY,
          width: document.documentElement.clientWidth,
      },
      padding: TagToolbarPadding,
      // tag: this.hoverTag, // just for debugging
    };

    // If we scrolled down, the toolbar might not be visible - calculate offset
    position.tagScrollOffset = Math.min(position.viewportOffset - position.bodyOffset.top, 0);

    // Update top coordinates
    // new: only do this on initial=true && follow != 'none' or not-initial
    // start by setting default-top
    position.top = position.tagOffset.top + TagToolbarPadding - position.bodyOffset.top;
    const trackMouse = (this.follow === TLB_FOLLOW_ALWAYS)
      || (this.follow === TLB_FOLLOW_INITIAL && initial)
      || (this.follow === TLB_FOLLOW_SCROLL && position.tagScrollOffset !== 0);

    const tagClasses = this.toolbarElement.classList;
    if (trackMouse)
      position.top = position.mousePos.y + position.win.scrollY - position.bodyOffset.top - (ToolbarHeight / 2);
    else
      if (tagClasses.contains(TlbHoverPrefix + TLB_HOV_MID))
        position.top = position.top + (position.tagHeight / 2) - ToolbarHeight;

    // Update left / right coordinates
    if (tagClasses.contains(TlbHoverPrefix + TLB_HOV_RIGHT))
      position.right = position.win.width - position.tagOffset.left - position.tagWidth + TagToolbarPaddingRight - position.bodyOffset.left;
    else
      position.left = position.tagOffset.left + TagToolbarPadding + position.bodyOffset.left;



    const tlbStyle = this.toolbarElement.style;
    tlbStyle.top = typeof position.top === 'number' ? `${position.top}px` : position.top;
    tlbStyle.left = typeof position.left === 'number' ? `${position.left}px` : position.left;
    tlbStyle.right = typeof position.right === 'number' ? `${position.right}px` : position.right;
  }


  /**
   * Hide the toolbar and detach scrolling-watcher
   */
  private hide() {
    if (this.alwaysShow) return;
    this.toolbarElement.style.display = 'none';
    this.disableScrollWatcher();
  }


  /**
   * Show the toolbar
   */
  private show() {
    // console.log('show');
    this.initializeIfNecessary();
    this.toolbarElement.style.display = 'block';
    this.updatePosition(true);
    this.activateScrollWatcher();
  }

  /**
   * Always show the toolbar.
   */
  private showPermanently() {
    // console.log('show permanently');
    this.show();
    // after a moment, adjust position because often initial position is a bit off
    window.addEventListener('load', this.updateFn);
    document.addEventListener('readystatechange', this.updateFn);
    // Also watch resizing, as the position would be wrong otherwise
    window.addEventListener('resize', this.updateFn);
  }

  /** Remember if scrollwatcher has been enabled */
  private watcherActive = false;
  /** The update function as a prebuild function, so it can be reused in on/off */
  private updateFn = () => this.updatePosition(false);
  /** Enable scroll watcher & remember */
  private activateScrollWatcher() {
    if (this.watcherActive) return;
    const trackOngoing = this.follow === TLB_FOLLOW_SCROLL || this.follow === TLB_FOLLOW_ALWAYS;
    if (!trackOngoing) return;
    window.addEventListener('scroll', this.updateFn);
    if (this.follow === TLB_FOLLOW_ALWAYS) window.addEventListener('mousemove', this.updateFn);
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

