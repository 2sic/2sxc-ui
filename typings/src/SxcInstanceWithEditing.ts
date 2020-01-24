import { SxcInstance } from './SxcInstance';

/**
 * Enhanced sxc instance with additional editing functionality
 * Use this, if you intend to run content-management commands like "edit" from your JS directly
 */
export interface SxcInstanceWithEditing extends SxcInstance {
    /**
     * manage object which provides access to additional content-management features
     * it only exists if 2sxc is in edit mode (otherwise the JS are not included for these features)
     */
    manage: any,
}
