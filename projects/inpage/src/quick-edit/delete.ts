import { Specs } from '.';

export interface Delete {
  delete(clip: Specs): Promise<void>;
}
