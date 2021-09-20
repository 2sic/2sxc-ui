export class NoJQ {

    /** https://api.jquery.com/jquery.param/ */
    static param(obj: any): string {
        const param = Object.entries(obj)
            .map(([k, v]) => `${encodeURIComponent(k)}=${typeof v === 'string' ? encodeURIComponent(v) : encodeURIComponent(JSON.stringify(v))}`)
            .join('&');
        return param;
    }

    /** Build DOM elements from string */
    static domFromString(string: string): HTMLElement[] {
        const container = document.createElement('div');
        container.insertAdjacentHTML('afterbegin', string);
        const elements = Array.from(container.children) as HTMLElement[];
        elements.forEach((e) => {
            container.removeChild(e);
        });
        return elements;
    }

    /** https://api.jquery.com/offset/ */
    static offset(element: HTMLElement): { left: number; top: number; } {
        const clientRect = element.getBoundingClientRect();
        const offset: { left: number; top: number; } = {
            top: clientRect.top + window.scrollY,
            left: clientRect.left + window.scrollX,
        };
        return offset;
    }

    /** https://api.jquery.com/width/ */
    static width(element: HTMLElement): number {
        // jquery width === offsetWidth - borders - padding
        const computedStyle = getComputedStyle(element);
        const width = element.offsetWidth === 0
            ? 0
            : element.offsetWidth
            - (parseInt(computedStyle.getPropertyValue('border-left-width'), 10) + parseInt(computedStyle.getPropertyValue('border-right-width'), 10))
            - (parseInt(computedStyle.getPropertyValue('padding-left'), 10) + parseInt(computedStyle.getPropertyValue('padding-right'), 10));
        return width;
    }

    /** https://api.jquery.com/height/ */
    static height(element: HTMLElement): number {
        // jquery height === offsetHeight - borders - padding
        const computedStyle = getComputedStyle(element);
        const height = element.offsetHeight === 0
            ? 0
            : element.offsetHeight
            - (parseInt(computedStyle.getPropertyValue('border-top-width'), 10) + parseInt(computedStyle.getPropertyValue('border-bottom-width'), 10))
            - (parseInt(computedStyle.getPropertyValue('padding-top'), 10) + parseInt(computedStyle.getPropertyValue('padding-bottom'), 10));
        return height;
    }

    /** https://api.jquery.com/outerWidth/ */
    static outerWidth(element: HTMLElement): number {
        const outerWidth = element.offsetWidth;
        return outerWidth;
    }

    /** https://api.jquery.com/empty/ */
    static empty(element: HTMLElement): void {
        Array.from(element.childNodes).forEach((n) => {
            element.removeChild(n);
        });
    }

    /** Removes content from the DOM and inserts new content in its place */
    static replaceWith(toBeReplaced: HTMLElement, newElement: HTMLElement): void {
        const parent = toBeReplaced.parentElement;
        parent.removeChild(toBeReplaced);
        parent.appendChild(newElement);
    }
}
