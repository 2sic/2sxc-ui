import { NoJQ } from '../interfaces/no-jquery';

// tslint:disable-next-line: no-var-requires
const Shake = require('shake.js');
// ReSharper disable once InconsistentNaming
// enable shake detection on all toolbars
NoJQ.ready(() => {
  // this will add a css-class to auto-show all toolbars (or remove it again)
  function toggleAllToolbars() {
    document.body.classList.toggle('sc-tb-show-all');
  }

  // debugger; // shake is not working, neither on ios nor android. Might be because of http and might work with https
  const shake = new Shake({ callback: toggleAllToolbars });
  // start shake-event monitoring, which will then generate a window-event
  shake.start();
});
