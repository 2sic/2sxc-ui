import { ContextOfButton } from '../context/context-of-button';
import { renderToolbar } from './item/render-toolbar';

/**
 * Remove orphan tag-toolbars from DOM
 */
export function CleanupTagToolbars() {
  const tagToolbars = $(`[${tagToolbarForAttr}]`);
  tagToolbars.each((i, e) => {
    const id = $(e).attr(tagToolbarForAttr);
    if (!$(`[${tagToolbarAttr}=${id}]`).length) {
      $(e).remove();
    }
  });
}

// tslint:disable-next-line: one-variable-per-declaration
const tagToolbarPadding = 4,
  tagToolbarPaddingRight = 0,
  toolbarHeight = 20;
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

export class TagToolbar {
  toolbarElement = null as JQuery<HTMLElement>;
  initialized = false;

  constructor(private readonly tag: JQuery<HTMLElement>, private readonly cnt: ContextOfButton) {
    this.updatePosition = this.updatePosition.bind(this);

    // Ensure toolbar gets visible when hovering
    tag.on('mouseenter', () => {
      this.initialize();
      this.showToolbar();
    });

    tag.on('mouseleave', (e) => {
      this.initialize();

      // if we hover the menu itself now, don't hide it
      if (!$.contains(this.toolbarElement[0], e.relatedTarget) && this.toolbarElement[0] !== e.relatedTarget)
        this.hideToolbar();
    });
  }

  initialize() {
    if (this.initialized)
      return;

    const toolbarId = `${this.cnt.instance.id}-${this.cnt.contentBlock.id}-${getMenuNumber()}`;

    // render toolbar and append tag to body
    this.toolbarElement = $(renderToolbar(this.cnt));

    this.toolbarElement.on('mouseleave', (e) => {
      // if we do not hover the tag now, hide it
      if (!$.contains(this.tag[0], e.relatedTarget) && this.tag[0] !== e.relatedTarget)
        this.hideToolbar();
    });

    $('body').append(this.toolbarElement);

    this.toolbarElement.attr(tagToolbarForAttr, toolbarId);
    this.tag.attr(tagToolbarAttr, toolbarId);

    this.toolbarElement.css({ display: 'none', position: 'absolute', transition: 'top 0.5s ease-out' });

    this.initialized = true;
  }

  updatePosition() {

    const position = {
      top: 'auto' as any,
      left: 'auto' as any,
      right: 'auto' as any,
      viewportOffset: this.tag[0].getBoundingClientRect().top,
      bodyOffset: getBodyOffset(),
      tagScrollOffset: 0,
      tagOffset: this.tag.offset(),
      tagWidth: this.tag.outerWidth(),
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


  hideToolbar() {
    $(window).off('scroll', this.updatePosition);
    this.toolbarElement.css({ display: 'none' });
  }



  showToolbar() {
    /*if (this.toolbarElement.is(':visible'))
      return;*/
    this.toolbarElement.css({ display: 'block' });

    $(window).on('scroll', this.updatePosition);
    this.updatePosition();
  }

}
