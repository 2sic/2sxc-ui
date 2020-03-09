import { SessionStateHandler } from '../manage/session-state-handler';


export let cbId = new SessionStateHandler<number>('dia-cbid');
export let cancelled = new SessionStateHandler<boolean>('cancelled-dialog');
