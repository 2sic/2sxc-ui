import { $jq } from '../interfaces/sxc-controller-in-page';

// tslint:disable-next-line: no-var-requires
const Shake = require('shake.js');
// ReSharper disable once InconsistentNaming

// enable shake detection on all toolbars
$jq(() => {
  // this will add a css-class to auto-show all toolbars (or remove it again)
  function toggleAllToolbars() {
    $jq(document.body).toggleClass('sc-tb-show-all');
  }

  const shake = new Shake({ callback: toggleAllToolbars });
  // start shake-event monitoring, which will then generate a window-event
  shake.start();
});
