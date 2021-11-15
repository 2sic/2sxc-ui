// import { C } from '../constants';

// prevent propagation of the click (if menu was clicked)
// 2021-09-17 spm this was used to fix click propagation to parent module, and now edit buttons
// are in a separate layer where parent is document.body so this should not be necessary anymore
// document.querySelectorAll<HTMLElement>(C.IDs.sel.scMenu).forEach((el) => {
//   el.addEventListener('click', (e) => e.stopPropagation());
// });
