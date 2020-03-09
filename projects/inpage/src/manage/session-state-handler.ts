import { DebugConfig } from "../DebugConfig";

/**
 * This object helps persist / load / reset 
 * a setting in the session-state
 * */
export class SessionStateHandler<T> {
  constructor(private readonly key: string) { }

  set(value: string): void {
    if(DebugConfig.state.change) console.log(`state '${this.key}' set(${value})`);
    sessionStorage.setItem(this.key, value);
  };

  remove(): void {
    if (DebugConfig.state.change) console.log(`state '${this.key}' remove()`);
    sessionStorage.removeItem(this.key);
  }

  get(): T {
    const result = SessionStorageHelper.getItemValue<T>(this.key);
    if (DebugConfig.state.get) console.log(`state '${this.key}' get() = '${result}'`);
    return result;
  }
}

/**
 * session storage helper to get typed values from it
 */
class SessionStorageHelper {
  static getItemValueString(key: string): string {
    const value = sessionStorage.getItem(key);
    return value;
  }

  static getItemValue<T>(key: string): T {
    const value = sessionStorage.getItem(key);
    return JSON.parse(value) as T;
  }
}
