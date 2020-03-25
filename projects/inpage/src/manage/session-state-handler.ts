import { HasLog, Insights } from '../logging';

/**
 * This object helps persist / load / reset
 * a setting in the session-state
 */
export class SessionStateHandler<T> extends HasLog {
    constructor(private readonly key: string) {
        super('Ses.State');
        Insights.add('system', 'session-state ' + key, this.log);
    }

    set(value: string): void {
        this.log.add(`state '${this.key}' set(${value})`);
        sessionStorage.setItem(this.key, value);
    }

    remove(): void {
        this.log.add(`state '${this.key}' remove()`);
        sessionStorage.removeItem(this.key);
    }

    get(): T {
        const result = getItemValue<T>(this.key);
        this.log.add(`state '${this.key}' get() = '${result}'`);
        return result;
    }
}

function getItemValue<T>(key: string): T {
    const value = sessionStorage.getItem(key);
    return JSON.parse(value) as T;
}
