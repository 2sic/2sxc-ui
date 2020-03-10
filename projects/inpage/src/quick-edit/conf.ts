export class Conf {
  enable: boolean;
  innerBlocks: {
    enable: boolean | string | null;
  };
  modules: {
    enable: boolean | string | null;
  };

  getAttribute?(configAttr: string): string;

  guid?: string;
}
