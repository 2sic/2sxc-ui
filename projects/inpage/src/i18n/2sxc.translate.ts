﻿import { Translator } from '.';

/**
 * provide an official translate API for 2sxc - currently internally using a jQuery library, but this may change
 * @param key
 */
export function translate(key: string): string {    return Translator.translate(key); }
