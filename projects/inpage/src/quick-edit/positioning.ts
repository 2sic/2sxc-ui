import { PositionCoordinates, QuickE, QeSelectors } from '.';

/**
 * Module with everything related to positioning the quick-edit in-page editing
 */
export class Positioning {
    static getBodyPosition = getBodyPosition;
    static positionAndAlign = positionAndAlign;
    static refresh = refresh;
    static getCoordinates = getCoordinates;
}

/**
 * Prepare offset calculation based on body positioning
 * @returns Point
 */
function getBodyPosition(): PositionCoordinates {
  const bodyPos = QuickE.body.css('position');
  return bodyPos === 'relative' || bodyPos === 'absolute'
    ? new PositionCoordinates(QuickE.body.offset().left, QuickE.body.offset().top)
    : new PositionCoordinates(0, 0);
}

/**
 * Refresh content block and modules elements
 */
function refreshDomObjects(): void {
  QuickE.bodyOffset =
    getBodyPosition(); // must update this, as sometimes after finishing page load the position changes, like when dnn adds the toolbar

  //// Cache the panes (because panes can't change dynamically)
  // if (!quickE.cachedPanes)
  //    quickE.cachedPanes = $(selectors.mod.listSelector);

  if (QuickE.config.innerBlocks.enable) {
    // get all content-block lists which are empty, or which allow multiple child-items
    const lists = $(QeSelectors.blocks.cb.listSelector).filter(`:not(.${QeSelectors.blocks.cb.singleItem}), :empty`);
    QuickE.contentBlocks = lists // $(selectors.cb.listSelector)
      .find(QeSelectors.blocks.cb.selector)
      .add(lists); // selectors.cb.listSelector);
  }
  if (QuickE.config.modules.enable)
    QuickE.modules = QuickE.cachedPanes
      .find(QeSelectors.blocks.mod.selector)
      .add(QuickE.cachedPanes);
}

/**
 * Last time when contentblock and modules are refreshed.
 * Helps to skip unnecessary calls to refresh(e).
 */
// namespace refreshDomObjects {
let lastCall: Date;
// }

/**
 * position, align and show a menu linked to another item
 */
function positionAndAlign(element: JQuery, coords: PositionCoordinates) {
  return element.css({
    left: coords.x - QuickE.bodyOffset.x,
    top: coords.yh - QuickE.bodyOffset.y,
    width: coords.element.width(),
  }).show();
}

/**
 * Refresh positioning / visibility of the quick-insert bar
 * @param e
 */
function refresh(e: JQueryEventObject) {
  const highlightClass: string = 'sc-cb-highlight-for-insert';
  const newDate = new Date();
  if ((!lastCall) || (newDate.getTime() - lastCall.getTime() > 1000)) {
    // console.log('refreshed contentblock and modules');
    lastCall = newDate;
    refreshDomObjects();
  }

  if (QuickE.config.innerBlocks.enable && QuickE.contentBlocks) {
    QuickE.nearestCb = findNearest(QuickE.contentBlocks, new PositionCoordinates(e.clientX, e.clientY));
  }

  if (QuickE.config.modules.enable && QuickE.modules) {
    QuickE.nearestMod = findNearest(QuickE.modules, new PositionCoordinates(e.clientX, e.clientY));
  }

  QuickE.modActions.toggleClass('sc-invisible', QuickE.nearestMod === null);
  QuickE.cbActions.toggleClass('sc-invisible', QuickE.nearestCb === null);

  const oldParent = QuickE.main.parentContainer;

  if (QuickE.nearestCb !== null || QuickE.nearestMod !== null) {
    const alignTo = QuickE.nearestCb || QuickE.nearestMod;

    // find parent pane to highlight
    const parentPane = $(alignTo.element).closest(QeSelectors.blocks.mod.listSelector);
    const parentCbList = $(alignTo.element).closest(QeSelectors.blocks.cb.listSelector);
    const parentContainer = (parentCbList.length ? parentCbList : parentPane)[0];

    // put part of the pane-name into the button-labels
    if (parentPane.length > 0) {
      let paneName: string = parentPane.attr('id') || '';
      if (paneName.length > 4) paneName = paneName.substr(4);
      QuickE.modActions.filter('[titleTemplate]').each(function() {
        const t = $(this);
        t.attr('title', t.attr('titleTemplate').replace('{0}', paneName));
      });
    }

    positionAndAlign(QuickE.main, alignTo);

    // Keep current block as current on menu
    QuickE.main.actionsForCb = QuickE.nearestCb ? QuickE.nearestCb.element : null;
    QuickE.main.actionsForModule = QuickE.nearestMod ? QuickE.nearestMod.element : null;
    QuickE.main.parentContainer = parentContainer;
    $(parentContainer).addClass(highlightClass);
  } else {
    QuickE.main.parentContainer = null;
    QuickE.main.hide();
  }

  // if previously a parent-pane was highlighted, un-highlight it now
  if (oldParent && oldParent !== QuickE.main.parentContainer)
    $(oldParent).removeClass(highlightClass);
}

/**
 * Return the nearest element to the mouse cursor from elements (jQuery elements)
 * @param elements
 * @param position
 */
function findNearest(elements: JQuery, position: PositionCoordinates): PositionCoordinates {
  const maxDistance: number = 30; // Defines the maximal distance of the cursor when the menu is displayed

  let nearestItem: PositionCoordinates = null;
  let nearestDistance = maxDistance;

  const posX: number = position.x + QuickE.win.scrollLeft();
  const posY: number = position.y + QuickE.win.scrollTop();

  // Find nearest element
  elements.each(function() {
    const e = getCoordinates($(this));

    // First check x coordinates - must be within container
    if (posX < e.x || posX > e.x + e.w)
      return;

    // Check if y coordinates are within boundaries
    const distance = Math.abs(posY - e.yh);

    if (distance < maxDistance && distance < nearestDistance) {
      nearestItem = e;
      nearestDistance = distance;
    }
  });

  return nearestItem;
}

function getCoordinates(element: JQuery): PositionCoordinates {
  // sometimes element.length === 0 and element.offset() = undefined
  // console.log("element.offset():", element.offset());
  // console.log("element.length:", element.length);

  const coords: PositionCoordinates = {
    element: element,
    x: element.offset().left,
    w: element.width(),
    y: element.offset().top,
    // For content-block ITEMS, the menu must be visible at the end
    // For content-block-LISTS, the menu must be at top
    yh: element.offset().top + (element.is(QeSelectors.eitherCbOrMod) ? element.height() : 0),
  };

  return coords;
}
