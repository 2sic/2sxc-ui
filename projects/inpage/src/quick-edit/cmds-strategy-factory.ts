import { Cb } from './cb';
import { Delete } from './delete';
import { Mod } from './mod';
import { Specs } from './specs';

export class CmdsStrategyFactory {
  cmds: { [key: string]: Delete };

  constructor() {
    this.cmds = {
        cb: new Cb(),
        mod: new Mod(),
    };
    // this.cmds.
    // this.cmds.mod = new Mod();
  }

//   getCmds(cliptype: string) {
//     return this.cmds[cliptype];
//   }

  delete(clip: Specs): Promise<void> {
    return this.cmds[clip.type].delete(clip);
  }
}
