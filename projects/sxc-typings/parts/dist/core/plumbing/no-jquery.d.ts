/** @internal */
export declare class NoJQ {
    /** https://api.jquery.com/ready/ */
    static ready(callback: () => void): void;
    /** https://api.jquery.com/jquery.param/ */
    static param(obj: any): string;
    /** Build DOM elements from string */
    static domFromString(string: string): HTMLElement[];
    /** https://api.jquery.com/offset/ */
    static offset(element: HTMLElement): {
        left: number;
        top: number;
    };
    /** https://api.jquery.com/width/ */
    static width(element: HTMLElement): number;
    /** https://api.jquery.com/height/ */
    static height(element: HTMLElement): number;
    /** https://api.jquery.com/outerWidth/ */
    static outerWidth(element: HTMLElement): number;
    /** https://api.jquery.com/empty/ */
    static empty(element: HTMLElement): void;
    /** https://api.jquery.com/replacewith/ */
    static replaceWith(toBeReplaced: HTMLElement, newElement: HTMLElement, runScripts: boolean): void;
    /** https://api.jquery.com/append/ */
    static append(parent: HTMLElement, newElements: HTMLElement[], runScripts: boolean): void;
}
/** @internal */
export declare class AssetsLoader {
    /** Asynchronously runs external and inline scripts in series */
    static runScripts(scripts: HTMLScriptElement[], callback: () => void): void;
}
