import { SessionStateHandler } from '../manage/session-state-handler';


/**
 * @internal
 */
export let cbId = new SessionStateHandler<number>('dia-cbid');

/**
 * @internal
 */
export let cancelled = new SessionStateHandler<boolean>('cancelled-dialog');
