const Shake = require('shake.js');
// ReSharper disable once InconsistentNaming

// enable shake detection on all toolbars
$(() => {

  // this will add a css-class to auto-show all toolbars (or remove it again)
  function toggleAllToolbars() {
    $(document.body).toggleClass('sc-tb-show-all');
  }

  const shake = new Shake({ callback: toggleAllToolbars });
  // start shake-event monitoring, which will then generate a window-event
  shake.start();
});
