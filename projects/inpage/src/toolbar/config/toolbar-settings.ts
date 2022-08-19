import { ToolbarInitConfig } from '../initialize/toolbar-init-config';
import { RuleManager } from '../rules/rule-manager';
import { ToolbarTemplate } from '../templates';

/** @internal */
export const TLB_MORE_AUTO = 'auto';
/** @internal */
export const TLB_MORE_END = 'end';
/** @internal */
export const TLB_MORE_START = 'start';
/** @internal */
type TypeAutoAddMore = null | typeof TLB_MORE_AUTO | typeof TLB_MORE_END | typeof TLB_MORE_START;
const TLB_MORE_OLD_TRUE = true;       //  [true: used to be right/start]
const TLB_MORE_OLD_RIGHT = 'right';   // fallback for older v1 setting

/** @internal */
export const TLB_HOV_RIGHT = 'right';
/** @internal */
export const TLB_HOV_LEFT = 'left';
/** @internal */
export const TLB_HOV_NONE = 'none'; // unclear if this is ever used?
/** @internal */
type TypeHover = typeof TLB_HOV_LEFT | typeof TLB_HOV_RIGHT | 'none';

/** @internal */
export const TLB_SHOW_ALWAYS = 'always';
/** @internal */
export const TLB_SHOW_HOVER = 'hover';
/** @internal */
type TypeShow = typeof TLB_SHOW_ALWAYS | typeof TLB_SHOW_HOVER;

const followDefault = 'default';
/** @internal */
export const TLB_FOLLOW_INITIAL = 'initial';
/** @internal */
export const TLB_FOLLOW_ALWAYS = 'always';
/** @internal */
export const TLB_FOLLOW_SCROLL = 'scroll';
/** @internal */
export type TypeFollow = 'default' | 'none' | typeof TLB_FOLLOW_INITIAL | typeof TLB_FOLLOW_ALWAYS | typeof TLB_FOLLOW_SCROLL;



/**
 * Toolbar behavior settings like float, etc.
 * @internal
 */
export class ToolbarSettings {
  /** Automatically add the '...' more button to the toolbar */
  autoAddMore: TypeAutoAddMore = TLB_MORE_AUTO;

  /** Hover placement of the toolbar */
  hover: TypeHover = TLB_HOV_RIGHT;

  /** Show behavior (always, hover, ...) */
  show: TypeShow = TLB_SHOW_HOVER;

  /** Follow behavior - if the toolbar should scroll with the page or remain where it was hovered */
  follow: TypeFollow = followDefault;

  /**
   * Old term, keep for compatibility. Please use `.class` instead
   * @deprecated
   */
  classes: string = '';

  /**
   * Term for the class for simplicity and consistency with button styling
   * New 10.27
   */
  class: string = '';

  /**
   * color configuration which applies to all buttons
   * use "colorname", "#xxyyzz" or "color1,color2" to specify the colors
   * New in 10.27
   */
  color?: string = '';

  /**
   * modifiers for the buttons
   * Should never be set from the page, but the toolbar initializer will set this
   * New in 10.27
   */
  _rules?: RuleManager;

  constructor(defaults: Partial<ToolbarSettings>) {

    // Copy all properties of the defaults IF this object also has that property
    if (defaults != null)
      Object.keys(this).forEach(k => {
        let kd = k as keyof typeof defaults;
        if (defaults[kd]) (this as any)[k] = defaults[kd];
      });

    // Swap the real follow-default to be "none"
    if (this.follow === followDefault) this.follow = 'none';
  }


  /**
   * removes autoAddMore and classes if are null or empty, to keep same behaviour like in v1
   *
   * Note 2dm: not sure why we're doing this, but it seems like we only need this to merge
   * various objects, so we probably want to make sure the in-html-toolbar doesn't accidentally
   * contain null-items we don't want passed on
   * @param toolbarSettings
   */
  static dropEmptyProperties(toolbarSettings: ToolbarSettings): Partial<ToolbarSettings> {
    const partialSettings = {...toolbarSettings};
    if (!partialSettings.autoAddMore) delete partialSettings.autoAddMore;
    if (!partialSettings.classes) delete partialSettings.classes;
    return partialSettings;
  }

  static getDefaults = () => new ToolbarSettings({ autoAddMore: TLB_MORE_AUTO, hover: TLB_HOV_RIGHT, show: 'hover', follow: 'default' });

  /** Setup for situations where an empty toolbar is needed, without any data or configuration */
  static getForEmpty = () => new ToolbarSettings({ autoAddMore: TLB_MORE_START, hover: TLB_HOV_LEFT, show: 'hover', follow: 'default' });

  /**
   * figure out best code to determine where to put it.
   * Important to neutralize historically different param names,
   * and to auto-detect if hover is left.
   * @param settings
   * @returns
   */
  static bestAddMorePos(settings: ToolbarSettings) {
    const result: TypeAutoAddMore = settings?.autoAddMore ?? TLB_MORE_AUTO;

    // On Auto try to detect based on hover position
    if (result === TLB_MORE_AUTO)
      return settings?.hover === TLB_HOV_LEFT ? TLB_MORE_START : TLB_MORE_END;

    // Standard values today, just return them
    if (result === TLB_MORE_END || result === TLB_MORE_START)
      return result;

    // Check old values which may still be in use
    if (result as string === TLB_MORE_OLD_RIGHT || result as boolean === TLB_MORE_OLD_TRUE)
      return TLB_MORE_END;

    // If it's anything else we don't know, just return it. It could be a custom class name, though this is not supported.
    return result;
  }
}


// TODO: this is in the wrong place, shouldn't be in settings
/**
 * @internal
 */
export const ToolbarWhenNoToolbarProvided = {
  toolbar: {} as ToolbarTemplate,
  settings: ToolbarSettings.getForEmpty(),
} as ToolbarInitConfig;
