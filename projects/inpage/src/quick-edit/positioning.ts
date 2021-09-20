import { PositionCoordinates, QeSelectors, QuickE } from '.';
import { NoJQ } from '../interfaces/no-jquery';
import { ContextForLists } from './context-for-lists';

/**
 * Module with everything related to positioning the quick-edit in-page editing
 */
export class Positioning {
    static positionAndAlign = positionAndAlign;
    static refresh = refresh;

    /**
     * Find the position of an element
     */
    static get(element: HTMLElement): PositionCoordinates {
        const coords: PositionCoordinates = {
            element: element,
            x: NoJQ.offset(element).left,
            w: NoJQ.width(element),
            y: NoJQ.offset(element).top,
            // For content-block ITEMS, the menu must be visible at the end
            // For content-block-LISTS, the menu must be at top
            yh: NoJQ.offset(element).top + (element.matches(QeSelectors.eitherCbOrMod) ? NoJQ.height(element) : 0),
        };

        return coords;
    }

    /**
     * Prepare offset calculation based on body positioning
     */
    static getBodyPosition(): PositionCoordinates {
        const posNoJq = document.body.style.position;
        const bodyPos = posNoJq; // QuickE.body.css('position');
        return bodyPos === 'relative' || bodyPos === 'absolute'
            ? new PositionCoordinates(NoJQ.offset(QuickE.body).left, NoJQ.offset(QuickE.body).top)
            : new PositionCoordinates(0, 0);
    }
}



/**
 * Refresh content block and modules elements
 */
function refreshDomObjects(): void {
    // must update this, as sometimes after finishing page load the position changes, like when dnn adds the toolbar
    QuickE.bodyOffset = Positioning.getBodyPosition();

    if (QuickE.config.innerBlocks.enable) {
        // get all content-block lists which are empty, or which allow multiple child-items
        const lists = QeSelectors.blocks.cb.findAllLists().filter((e) => e.matches(`:not(.${QeSelectors.blocks.cb.singleItem}), :empty`));
        const children: HTMLElement[] = [];
        lists.forEach((l) => {
            children.push(...Array.from(l.querySelectorAll<HTMLElement>(QeSelectors.blocks.cb.selector)));
        });
        QuickE.contentBlocks = [...lists, ...children];
    }

    if (QuickE.config.modules.enable) {
        const panes = QuickE.cachedPanes;
        const children: HTMLElement[] = [];
        panes.forEach((p) => {
            children.push(...Array.from(p.querySelectorAll<HTMLElement>(QeSelectors.blocks.mod.selector)));
        });
        QuickE.modules = [...panes, ...children];
    }
}

/**
 * Last time when contentblock and modules are refreshed.
 * Helps to skip unnecessary calls to refresh(e).
 */
let lastCall: Date;

/**
 * position, align and show a menu linked to another item
 */
function positionAndAlign(element: HTMLElement, coords: PositionCoordinates) {
    element.style.left = `${coords.x - QuickE.bodyOffset.x}px`;
    element.style.top = `${coords.yh - QuickE.bodyOffset.y}px`;
    element.style.width = `${NoJQ.width(coords.element)}px`;
    element.style.display = 'block';
    return element;
}

/**
 * Refresh positioning / visibility of the quick-insert bar
 * @param e
 */
function refresh(e: MouseEvent) {
    const highlightClass: string = 'sc-cb-highlight-for-insert';
    const newDate = new Date();
    if ((!lastCall) || (newDate.getTime() - lastCall.getTime() > 1000)) {
        // console.log('refreshed contentblock and modules');
        lastCall = newDate;
        refreshDomObjects();
    }

    // find the closest content-blocks and modules
    const currentCoords = new PositionCoordinates(e.clientX, e.clientY);
    if (QuickE.config.innerBlocks.enable && QuickE.contentBlocks)
        QuickE.nearestCb = findNearest(QuickE.contentBlocks, currentCoords);
    if (QuickE.config.modules.enable && QuickE.modules)
        QuickE.nearestMod = findNearest(QuickE.modules, currentCoords);

    // hide the buttons for content-block or module, if they are not affected
    QuickE.modActions.forEach((a) => {
        a.classList.toggle('sc-invisible', QuickE.nearestMod === null);
    });
    QuickE.cbActions.forEach((a) => {
        a.classList.toggle('sc-invisible', QuickE.nearestCb === null);
    });

    const oldParent = QuickE.main._parentNode;

    if (QuickE.nearestCb !== null || QuickE.nearestMod !== null) {
        const alignTo = QuickE.nearestCb || QuickE.nearestMod;

        // find parent pane to highlight
        const parentPane = QeSelectors.blocks.mod.findClosestList(alignTo.element);
        const parentCbList = QeSelectors.blocks.cb.findClosestList(alignTo.element);
        const parentContainer = parentCbList ?? parentPane;
        provideCorrectAddButtons(parentContainer);
        // put part of the pane-name into the button-labels
        if (parentPane) {
            let paneName: string = parentPane.getAttribute('id') || '';
            if (paneName.length > 4) paneName = paneName.substr(4);
            QuickE.modActions.filter((a) => a.matches('[titleTemplate]')).forEach((a) => {
                a.setAttribute('title', a.getAttribute('titleTemplate').replace('{0}', paneName));
            });
        }

        positionAndAlign(QuickE.main, alignTo);

        // Keep current block as current on menu
        QuickE.main.activeContentBlock = QuickE.nearestCb ? QuickE.nearestCb.element : null;
        QuickE.main.activeModule = QuickE.nearestMod ? QuickE.nearestMod.element : null;
        QuickE.main._parentNode = parentContainer;
        parentContainer.classList.add(highlightClass);
    } else {
        QuickE.main._parentNode = null;
        QuickE.main.style.display = 'none';
    }

    // if previously a parent-pane was highlighted, un-highlight it now
    if (oldParent && oldParent !== QuickE.main._parentNode)
        oldParent.classList.remove(highlightClass);
}

function provideCorrectAddButtons(tag: HTMLElement) {
    const listSettings = ContextForLists.getFromDom(tag);
    let showContent = true;
    let showApps = true;
    if (listSettings.appList.length > 0) {
        showContent = listSettings.appList.indexOf('Content') > -1;
        // only show apps if the list is longer than 'Content' if it contains that
        showApps = listSettings.appList.length - (showContent ? 1 : 0) > 0;
    }
    QuickE.cbActions.forEach((a) => {
        a.classList.toggle('hide-content', !showContent);
        a.classList.toggle('hide-app', !showApps);
    });
}

/**
 * Return the nearest element to the mouse cursor from elements
 * @param elements
 * @param position
 */
function findNearest(elements: HTMLElement[], position: PositionCoordinates): PositionCoordinates {
    const maxDistance: number = 30; // Defines the maximal distance of the cursor when the menu is displayed

    let nearestItem: PositionCoordinates = null;
    let nearestDistance = maxDistance;

    const posX: number = position.x + window.scrollX;
    const posY: number = position.y + window.scrollY;

    // Find nearest element
    elements.forEach((element) => {
        const e = Positioning.get(element);

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
