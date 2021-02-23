
// NOTE: PROBABLY NOT USED - DELETE IF NOT USED
/**
 * WIP
 * This should be used in promise chains to determine if the UI should auto-reload etc.
 * Mainly for SPA scenarios
 */
export interface InterceptCommandParams {
    event: Event;
    name: string;
    cancel: boolean;
    uiOnly: boolean;
    changed: boolean;
    reload: boolean;
    reloadAjax: boolean;
}
