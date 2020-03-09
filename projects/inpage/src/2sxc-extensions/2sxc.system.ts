import { windowInPage as window } from '../interfaces/window-in-page';

/** this enhances the $2sxc client controller with stuff only needed when logged in */
if (window.$2sxc && !window.$2sxc.system) {
  window.$2sxc.system = {
    finishUpgrade: finishUpgrade,
  };
}

// upgrade command - started when an error contains a link to start this
function finishUpgrade(domElement: HTMLElement): void {
  const mc = window.$2sxc(domElement);
  mc.webApi.get('view/module/finishinstallation')
    .success(() => {
      alert('Upgrade ok, restarting the CMS and reloading...');
      location.reload();
    });
  alert('starting upgrade. This could take a few minutes. You\'ll see an \'ok\' when it\'s done. Please wait...');
}
