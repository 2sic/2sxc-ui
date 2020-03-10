import { SxcIntanceEditable } from '../interfaces/sxc-instance-editable';

export function isSxcInstance(thing: any): thing is SxcIntanceEditable {
  return (thing as SxcIntanceEditable).showDetailedHttpError !== undefined;
}

