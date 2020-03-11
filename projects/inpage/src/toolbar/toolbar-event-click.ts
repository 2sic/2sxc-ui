import { IDs } from '../settings/2sxc.consts';

// prevent propagation of the click (if menu was clicked)
$(IDs.sel.scMenu).click((e) => e.stopPropagation());
