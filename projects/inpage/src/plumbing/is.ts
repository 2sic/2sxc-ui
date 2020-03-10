import { SxcInstanceWithInternals } from '../../../$2sxc/src/index';

export function isSxcInstance(thing: any): thing is SxcInstanceWithInternals {
  return (thing as SxcInstanceWithInternals).showDetailedHttpError !== undefined;
}

