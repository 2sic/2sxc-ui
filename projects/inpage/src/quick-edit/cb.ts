import { getSxcInstance } from '../x-bootstrap/sxc';

/**
 * extend the quick edit with the core commands
 */

export class Cb implements Delete {
  delete(clip: any): any {
    const sxc = getSxcInstance(clip.list);
    return sxc.manage._getCbManipulator().delete(clip.parent, clip.field, clip.index);
  }

  static create(parent: number, field: string, index: number, appOrContent: string, list: any, newGuid: string): any {
    const sxc = getSxcInstance(list);
    return sxc.manage._getCbManipulator().create(parent, field, index, appOrContent, list, newGuid);
  }
}
