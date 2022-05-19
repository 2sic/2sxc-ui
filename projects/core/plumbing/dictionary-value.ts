import { TypeValue } from '.';

export interface Dictionary<T> { [key: string]: T; }

/** @internal */
export interface DictionaryValue { [key: string]: TypeValue; }
