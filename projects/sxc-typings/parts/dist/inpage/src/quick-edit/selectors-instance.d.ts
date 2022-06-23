/**
 * @internal
 */
export declare const QeSelectors: {
    blocks: {
        [key: string]: CbOrMod;
    };
    eitherCbOrMod: string;
    selected: string;
};
/**
 * Structure for constants in the selectors, to guarantee we got everything
 */
interface CbOrMod {
    id: string;
    class: string;
    selector: string;
    findAllLists: () => HTMLElement[];
    findClosestList: (element: HTMLElement) => HTMLElement;
    context: string;
    singleItem?: string;
}
export {};
