import { BootstrapInPage } from '../bootstrap/bootstrap';
import { $2sxcInPage } from '../interfaces/sxc-controller-in-page';

const bootstrapper = new BootstrapInPage();

$2sxcInPage._bootstrapper = bootstrapper;

$(document).ready(() => {
    bootstrapper.initialize();
});
