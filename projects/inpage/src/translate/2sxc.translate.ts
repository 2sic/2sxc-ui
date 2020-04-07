import { TypeWeDontCare } from '../plumbing';

/**
 * provide an official translate API for 2sxc - currently internally using a jQuery library, but this may change
 * @param key
 */
export function translate(key: string): string {
    const tFn = ($ as TypeWeDontCare).t;
    return (tFn && tFn(key)) || key;
}

$(() => console.log('i18n tests 5', translate('Toolbar.Edit')));
