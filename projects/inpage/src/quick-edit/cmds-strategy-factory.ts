import { Cb } from './cb';
import { Mod } from './mod';

export class CmdsStrategyFactory {
  cmds: Dictionary;

  constructor() {
    this.cmds = {};
    this.cmds.cb = new Cb();
    this.cmds.mod = new Mod();
  }

  getCmds(cliptype: string): Delete {
    return this.cmds[cliptype];
  }

  delete(clip: any): Delete {
    return this.cmds[clip.type].delete(clip);
  }
}
