import { C } from '../constants';

// prevent propagation of the click (if menu was clicked)
$(C.IDs.sel.scMenu).click((e) => e.stopPropagation());
