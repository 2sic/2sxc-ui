import { $2sxcInPage as $2sxc } from '../interfaces/sxc-controller-in-page';
import { IDs } from '../2sxc-extensions/2sxc.consts';

// prevent propagation of the click (if menu was clicked)
$(IDs.sel.scMenu).click((e: any) => e.stopPropagation());
