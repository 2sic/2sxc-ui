import { IDs } from '../2sxc-extensions/2sxc.consts';

// prevent propagation of the click (if menu was clicked)
$(IDs.sel.scMenu).click((e) => e.stopPropagation());
