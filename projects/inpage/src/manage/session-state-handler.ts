import { HasLog, Insights } from '../core';

/**
 * This object helps persist / load / reset
 * a setting in the session-state
 * @internal
 */

// General notes
// - must always use try-catch because in certain environments like iFrame prohibit access to sessionStorage
export class SessionStateHandler<T> extends HasLog {
  constructor(private readonly key: string) {
    super('Ses.State');
    Insights.add('system', 'session-state ' + key, this.log);
  }

  set(value: string): void {
    this.log.add(`state '${this.key}' set(${value})`);
    try {
      sessionStorage.setItem(this.key, value);
    } catch { /* ignore */ }
  }

  remove(): void {
    this.log.add(`state '${this.key}' remove()`);
    try {
      sessionStorage.removeItem(this.key);
    } catch { /* ignore */ }
  }

  get(): T {
    const result = getItemValue<T>(this.key);
    this.log.add(`state '${this.key}' get() = '${result}'`);
    try {
      return result;
    } catch { /* ignore */ }
  }
}


function getItemValue<T>(key: string): T {
  try {
    const value = sessionStorage.getItem(key);
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}
