import { AssetsLoader } from './assets-loader';

/** @internal */
export class NoJQ {

    /** https://api.jquery.com/ready/ */
    static ready(callback: () => void): void {
        if (document.readyState === 'complete') {
            callback();
        } else {
            document.addEventListener('DOMContentLoaded', () => callback(), { once: true });
        }
    }

    /** https://api.jquery.com/jquery.param/ */
    static param(obj: any): string {
        const param = Object.entries(obj)
            .map(([k, v]) => `${encodeURIComponent(k)}=${v == null ? '' : typeof v === 'string' ? encodeURIComponent(v) : encodeURIComponent(JSON.stringify(v))}`)
            .join('&');
        return param;
    }

    /** Build DOM elements from string */
    static domFromString(string: string): HTMLElement[] {
        // build elements from string into dummy parent
        const dummyParent = document.createElement('div');
        dummyParent.insertAdjacentHTML('afterbegin', string);

        // scripts created from string are not executable and have to recreated manually to be executable
        Array.from(dummyParent.querySelectorAll('script')).forEach((brokenScript) => {
            const workingScript = document.createElement('script');
            // copy attributes
            Array.from(brokenScript.attributes).forEach((attribute) => {
                workingScript.setAttribute(attribute.nodeName, attribute.nodeValue);
            });
            // copy inline part
            workingScript.textContent = brokenScript.textContent;
            // replace a non executable script with executable one
            NoJQ.replaceWith(brokenScript, workingScript, false);
        });

        // remove created elements from dummy parent so it can be garbage collected
        const elements = Array.from(dummyParent.children) as HTMLElement[];
        elements.forEach((element) => {
            dummyParent.removeChild(element);
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


    /** https://api.jquery.com/empty/ */
    static empty(element: HTMLElement): void {
        Array.from(element.childNodes).forEach((n) => {
            element.removeChild(n);
        });
    }

    /** https://api.jquery.com/replacewith/ */
    static replaceWith(toBeReplaced: HTMLElement, newElement: HTMLElement, runScripts: boolean): void {
        const parent = toBeReplaced.parentElement;

        // disable scripts before replacing dom
        const scripts = Array.from(newElement.querySelectorAll('script'));
        const restores: ScriptTypeRestore[] = [];
        scripts.forEach((script) => {
            restores.push({ script, type: script.type });
            script.type = null;
        });

        // replace dom
        parent.replaceChild(newElement, toBeReplaced);

        // enable scripts
        restores.forEach((restore) => {
            restore.script.type = restore.type;
        });

        if (runScripts) {
            // run scripts manually to ensure proper timing
            AssetsLoader.runScripts(scripts, undefined);
        }
    }

    /** https://api.jquery.com/append/ */
    static append(parent: HTMLElement, newElements: HTMLElement[], runScripts: boolean): void {
        const scripts: HTMLScriptElement[] = [];

        newElements.forEach((element) => {
            if (element.tagName.toLocaleLowerCase() === 'script') {
                const script = element as HTMLScriptElement;
                // disable script before inserting to the dom
                const restoreType = script.type;
                script.type = null;
                // insert to dom
                parent.appendChild(script);
                // enable script
                script.type = restoreType;
                scripts.push(script);
            } else {
                parent.appendChild(element);
            }
        });

        if (runScripts && scripts.length > 0) {
            // run scripts manually to ensure proper timing
            AssetsLoader.runScripts(scripts, undefined);
        }
    }
}

interface ScriptTypeRestore {
    script: HTMLScriptElement;
    type: string;
}
