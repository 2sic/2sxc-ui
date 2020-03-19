import { SxcInstanceWithInternals } from '../../../$2sxc/src';
import { EditManager } from '../manage/edit-manager';
import { TypeTbD } from '../plumbing';


export class SxcIntanceEditable extends SxcInstanceWithInternals {
    manage: EditManager;

    static is(thing: TypeTbD): thing is SxcIntanceEditable {
        return (thing as SxcIntanceEditable).showDetailedHttpError !== undefined;
    }

    static get(module: number | HTMLElement | JQuery, cbid?: number): SxcIntanceEditable {
        const sxc = window.$2sxc(module, cbid) as unknown as SxcIntanceEditable;
        return sxc;
    }
}
