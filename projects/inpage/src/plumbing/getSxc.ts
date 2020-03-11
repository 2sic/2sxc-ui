import { SxcIntanceEditable } from '../interfaces/sxc-instance-editable';
import { TypeTbD, TypeUnsafe } from './TypeTbD';

export function getSxc(module: number | HTMLElement | JQuery, cbid?: number): SxcIntanceEditable {
    const sxc = window.$2sxc(module, cbid) as TypeUnsafe as SxcIntanceEditable;
    return sxc;
}

export function isSxcInstance(thing: TypeTbD): thing is SxcIntanceEditable {
  return (thing as SxcIntanceEditable).showDetailedHttpError !== undefined;
}

