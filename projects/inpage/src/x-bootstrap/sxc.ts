import { $2sxcInPage as $2sxc } from '../interfaces/sxc-controller-in-page';

export function getSxcInstance(module: any, cbid?: number): SxcInstanceWithInternals {
  const sxc = $2sxc(module, cbid) as SxcInstanceWithInternals;
  return sxc;
}
