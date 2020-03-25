import { BootstrapInPage } from '../bootstrap/bootstrap';

const bootstrapper = new BootstrapInPage();

$(document).ready(() => {
    bootstrapper.initialize();
});
