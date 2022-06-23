import { PositionCoordinates } from '.';
/**
 * Module with everything related to positioning the quick-edit in-page editing
 * @internal
 */
export declare class Positioning {
    static positionAndAlign: typeof positionAndAlign;
    static refresh: typeof refresh;
    /**
     * Find the position of an element
     */
    static get(element: HTMLElement): PositionCoordinates;
    /**
     * Prepare offset calculation based on body positioning
     */
    static getBodyPosition(): PositionCoordinates;
}
/**
 * position, align and show a menu linked to another item
 */
declare function positionAndAlign(element: HTMLElement, coords: PositionCoordinates): HTMLElement;
/**
 * Refresh positioning / visibility of the quick-insert bar
 * @param e
 */
declare function refresh(e: MouseEvent): void;
export {};
