/**
 * extend the quick edit with the core commands
 */

export class Cb implements Delete {
  delete(clip: any): any {
    const sxc = window.$2sxc(clip.list);
    return sxc.manage._getCbManipulator().delete(clip.parent, clip.field, clip.index);
  }

  static create(parent: number, field: string, index: number, appOrContent: string, list: any, newGuid: string): any {
    const sxc = window.$2sxc(list);
    return sxc.manage._getCbManipulator().create(parent, field, index, appOrContent, list, newGuid);
  }
}
