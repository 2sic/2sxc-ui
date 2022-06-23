import { ContextComplete } from '../context/bundles/context-bundle-button';
/**
 * this enhances the $2sxc client controller with stuff only needed when logged in
 * @internal
 */
export declare let contentItems: {
    delete: (context: ContextComplete, itemId: number, itemGuid: string, itemTitle: string) => Promise<void>;
};
