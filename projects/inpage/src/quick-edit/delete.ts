import { Specs } from './specs';

export interface Delete {
  delete(clip: Specs): JQueryPromise<void>;
}
