import { SxcEdit } from '../interfaces/sxc-instance-editable';

//#region WebApi Endpoints used: 2sxc
const webApiInstallComplete = 'sys/install/resume';
//#endregion

/**
 * @internal
 */
export class SystemUpgrader {
    // upgrade command - started when an error contains a link to start this
    finishUpgrade(domElement: HTMLElement): void {
        const mc = SxcEdit.get(domElement);
        mc.webApi.fetchRaw(webApiInstallComplete)
            .then(() => {
                alert('Upgrade ok, restarting the CMS and reloading...');
                location.reload();
            });
        alert('starting upgrade. This could take a few minutes. You\'ll see an \'ok\' when it\'s done. Please wait...');
    }
}
