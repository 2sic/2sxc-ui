import { Translator } from '.';

/**
 * provide an official translate API for 2sxc
 * @param key
 * @internal
 */
export function translate(key: string): string { return Translator.translate(key); }
