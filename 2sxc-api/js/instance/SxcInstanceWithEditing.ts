import { SxcInstance } from './SxcInstance';
import { SxcRootInternals } from '../SxcRoot/SxcRootInternals';
import { SxcRoot } from '../SxcRoot/SxcRoot';


/**
 * Enhanced sxc instance with additional editing functionality
 * Use this, if you intend to run content-management commands like "edit" from your JS directly
 */
export class SxcInstanceWithEditing extends SxcInstance {
    /**
     * manage object which provides access to additional content-management features
     * it only exists if 2sxc is in edit mode (otherwise the JS are not included for these features)
     */
    manage: any = null; // initialize correctly later on

    constructor(
        public id: number,
        public cbid: number,
// ReSharper disable once InconsistentNaming
        protected $2sxc: SxcRoot & SxcRootInternals,
    ) {
        super(id, cbid, $2sxc);

        // add manage property, but not within initializer, because inside the manage-initializer it may reference 2sxc again
        try { // sometimes the manage can't be built, like before installing
            if ($2sxc._manage) $2sxc._manage.initInstance(this);
        } catch (e) {
            console.error('error in 2sxc - will only log but not throw', e);
        }

        // this only works when manage exists (not installing) and translator exists too
        if ($2sxc._translateInit && this.manage) 
            // ensure that we really have a manage context, otherwise we can't initialize i18n and it doesn't make sense
            if(this.manage.context && this.manage.context.app && this.manage.context.app.currentLanguage)
                $2sxc._translateInit(this.manage);    // init translate, not really nice, but ok for now

    }

    /**
     * checks if we're currently in edit mode
     * @returns {boolean}
     */
    isEditMode(): boolean {
        return this.manage && this.manage._isEditMode();
    }

}

