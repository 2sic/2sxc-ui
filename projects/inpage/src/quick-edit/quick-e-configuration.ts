
export const QuickEditConfigEnableAuto: string = 'auto';

/**
 * Buttons on a quick-edit toolbar
 * @public
 */
// Note: It's actually used as an interface, but we made it a class so the docs can show the default being true on all values
export class QuickEditConfigButtons {
  /**
   * Enable the button to "Add Content"
   */
  addContent?: boolean = true;

  /**
   * Enable the button to "add App"
   */
  addApp?: boolean = true;

  /**
   * Enable the button "Select"
   */
  select?: boolean = true;

  /**
   * Enable the button "Paste"
   */
  paste?: boolean = true;

  /**
   * Enable the button "Delete"
   */
  delete?: boolean = true;

  /**
   * Enable the button "Move"
   */
  move?: boolean = true;
}

/**
 * Quick Edit Configuration which has an `enable` and specific button configurations
 * @public
 */
export class QuickEditConfig {
  /**
   * Determine whether this section is enabled.
   */
  // Important: write 'auto', don't use constant, because of generated docs
  enable?: boolean | 'auto' = 'auto';

  /**
   * Optional detailed configuration of the buttons.
   */
  buttons?: QuickEditConfigButtons;
}

/**
 * Quick Edit - Full configuration at root, with `enable` and rules for `modules` and `innerBlocks`
 * @public
 */
export class QuickEditConfigRoot extends QuickEditConfig {
  /**
   * The buttons configuration on the root.
   * Will be used for the `modules` and `innerBlocks` if not specified there.
   * Note that if not specified, will always default to true for all buttons.
   */
  buttons?: QuickEditConfigButtons;

  /**
   * Optional configuration for the Inner Content Blocks.
   */
  innerBlocks?: QuickEditConfig;

  /**
   * Optional configuration for the Modules.
   */
  modules?: QuickEditConfig;

  /**
   * @internal
   */
  static getDefault(): QuickEditConfigRoot {
    return {
      enable: true,
      buttons: new QuickEditConfigButtons(),
      innerBlocks: {
        enable: QuickEditConfigEnableAuto,
      },
      modules: {
        enable: QuickEditConfigEnableAuto,
      },
    } as QuickEditConfigRoot;
  }
}