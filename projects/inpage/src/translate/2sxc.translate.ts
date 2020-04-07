/**
 * provide an official translate API for 2sxc - currently internally using a jQuery library, but this may change
 * @param key
 */
export function translate(key: string): string {
    const tFn = ($ as any).t;
    return (tFn && tFn(key)) || key;
}

$(() => console.log('i18n tests 4', translate('Toolbar.Edit')));

