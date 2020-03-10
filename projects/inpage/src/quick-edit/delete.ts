import { Specs } from './specs';

export interface Delete {
  delete(clip: Specs): Promise<void>;
}
