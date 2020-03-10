import { SxcIntanceEditable } from '../interfaces/sxc-instance-editable';
import { getSxc } from '../plumbing/getSxc';
import { Delete } from './delete';
import { Specs } from './specs';

/**
 * extend the quick edit with the core commands
 */
export class Cb implements Delete {
  delete(clip: Specs): Promise<void> {
    const sxc = getSxc(clip.list);
    return sxc.manage._getCbManipulator().delete(clip.parent, clip.field, clip.index);
  }

  static create(parent: number, field: string, index: number, appOrContent: string, list: JQuery, newGuid: string): Promise<void> {
    const sxc = getSxc(list);
    return sxc.manage._getCbManipulator().create(parent, field, index, appOrContent, list, newGuid);
  }
}
