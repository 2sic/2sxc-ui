/**
 * Configuration of QuickE
 * see also https://docs.2sxc.org/specs/js/quicke.html
 * @internal
 */
export namespace QuickEditConfig {

  /** Buttons on a quick-edit toolbar */
  export interface Buttons {
    addContent: boolean;
    addApp: boolean;
    select: boolean;
    paste: boolean;
    delete: boolean;
    move: boolean;
  }

  export const DefaultButtons: Buttons = {
    addApp: true,
    addContent: true,
    select: true,
    paste: true,
    delete: true,
    move: true,
  };

  export function getNewDefaultConfig() {
    return {
      enable: true,
      buttons: QuickEditConfig.DefaultButtons,
      innerBlocks: {
        enable: null, // default: auto-detect
      },
      modules: {
        enable: null, // default: auto-detect
      },
    } as QuickEditConfig.FullConfig;
  }
  

  /** Configuration set used in the root and in each sub-node (innerblocks/modules) */
  interface ConfigSet {
    enable: boolean | string | null;
    buttons?: Buttons;
  }

  /** Full configuration set */
  export interface FullConfig extends ConfigSet {
    innerBlocks: ConfigSet;
    modules: ConfigSet;
  }
}
