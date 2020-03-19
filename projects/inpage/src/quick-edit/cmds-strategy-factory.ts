import { Delete, QeContentBlock, QeModule, Specs } from '.';

export class CmdsStrategyFactory {
  cmds: { [key: string]: Delete };

  constructor() {
    this.cmds = {
        cb: new QeContentBlock(),
        mod: new QeModule(),
    };
  }

  delete(clip: Specs): Promise<void> {
    return this.cmds[clip.type].delete(clip);
  }
}
