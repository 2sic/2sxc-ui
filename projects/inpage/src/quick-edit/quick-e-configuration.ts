/**
 * Configuration of QuickE
 * see also https://docs.2sxc.org/specs/js/quicke.html
 */
export namespace QuickEditConfig {

  export interface Buttons {
    addContent: boolean;
    addApp: boolean;
    select: boolean;
    paste: boolean;
    delete: boolean;
    move: boolean;
  }

  interface ConfigSet {
    enable: boolean | string | null;
    buttons?: Buttons;
  }
  export interface FullConfig extends ConfigSet {
    innerBlocks: ConfigSet;
    modules: ConfigSet;
  }
}
