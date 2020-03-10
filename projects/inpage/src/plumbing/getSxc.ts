import { SxcIntanceEditable } from '../interfaces/sxc-instance-editable';

export function getSxc(module: number | HTMLElement | JQuery, cbid?: number): SxcIntanceEditable {
    const sxc = window.$2sxc(module, cbid) as any as SxcIntanceEditable;
    return sxc;
}
