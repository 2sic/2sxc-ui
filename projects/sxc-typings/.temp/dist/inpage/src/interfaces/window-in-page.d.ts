import { TypeWeDontCare } from '../plumbing';
import { QuickE } from '../quick-edit/quick-e';
/**
 * Update Window object with global 2sxc objects / Dnn objects
 * Internal only, as it's not supposed to be on the public API
 * @internal
 */
declare global {
    interface Window {
        dnn_tabVersioningEnabled: boolean;
        dnn: TypeWeDontCare;
        $quickE: QuickE;
    }
}
