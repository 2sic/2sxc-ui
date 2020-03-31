/*

    TODO: 2dm must verify this works, my change could have broken something
*/
import { SxcEdit } from '../interfaces/sxc-instance-editable';
import { windowInPage as window } from '../interfaces/window-in-page';

export class SystemUpgrader {
    // upgrade command - started when an error contains a link to start this
    finishUpgrade(domElement: HTMLElement): void {
    const mc = SxcEdit.get(domElement);
    mc.webApi.get('view/module/finishinstallation')
        .done(() => {
            alert('Upgrade ok, restarting the CMS and reloading...');
            location.reload();
        });
    alert('starting upgrade. This could take a few minutes. You\'ll see an \'ok\' when it\'s done. Please wait...');
    }
}

/** this enhances the $2sxc client controller with stuff only needed when logged in */
if (window.$2sxc && !window.$2sxc.system) {
    window.$2sxc.system = new SystemUpgrader();
}
