import { C } from '../constants';
import { $jq } from '../interfaces/sxc-controller-in-page';

// prevent propagation of the click (if menu was clicked)
$jq(C.IDs.sel.scMenu).on('click', (e) => e.stopPropagation());
