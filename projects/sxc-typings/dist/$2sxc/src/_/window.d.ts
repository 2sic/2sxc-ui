import { SxcGlobal } from '../sxc-root';
declare global {
    interface Window {
        $2sxc: SxcGlobal;
    }
}
