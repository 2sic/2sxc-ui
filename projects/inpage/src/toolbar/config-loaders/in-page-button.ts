import { InPageCommandJson } from '.';
import { CommandParams } from '../../commands/command-params';
import { TypeTbD } from '../../plumbing/TypeTbD';

/**
 * Button Definition v1. from old API
 * it is publicly used out of inpage, so take a care to preserve its signature
 */
export class InPageButtonJson {
  // object command the internal command which will be called, should contain both the name and the parameters like { action: "new", contentType: "BlogPost"}
  command?: InPageCommandJson;

  // string title a text which is shown on mouse-over. Note that 2sxc will try to run it through the translator, so you can also use placeholders like Toolbar.Metadata
  title?: string;

  // string icon a css class giving the button the icon. It can be one of the icons 2sxc provides, or it can be your own - just be sure to include a CSS & font which resolves the icon
  icon?: string;

  // string classes comma separated list of class-names like makeRed,glowHover
  classes?: string;

  // function dynamicClasses(settings) can be used to dynamically build classes depending on the situation
  dynamicClasses?(settings: CommandParams): string;

  // bool/function showCondition (API still experimental) - used to dynamically choose if this button should be shown or not
  showCondition?(settings: CommandParams): boolean;

  // bool disabled (API still experimental) would disable the click on a button
  disabled?: boolean;

  // bool partOfPage (API still experimental, new in 2sxc 9.5) determines if resulting changes should effect the Evoq/DNN Page Publishing - note that it only effects the page-lifecyle, if the resulting dialogs and APIs respect this setting
  partOfPage?: boolean;

  // tbd, not documented
  params?: CommandParams;

  // true/false if this is just something visual; otherwise a webservice will ensure that a content-group exists (for editing etc.)
  uiActionOnly?: boolean;

  // code(settings, event) - the code executed on click, if it's not the default action
  code?<T>(settings: CommandParams): Promise<void | T>;

  // created in the buttonConfig v1
  name?: string;

  // definition v1...
  dialog?: string;
  newWindow?: boolean;
  inlineWindow?: boolean;
  fullScreen?: boolean;

  // entity support (vertical compatibility for pre 2sxc v9.x)
  entity?: number; // probably not a number...
  useModuleList?: boolean;
  entityId?: number;
  sortOrder?: number;

  _expanded?: boolean; // marker to determine that the configuration has already been initialized

  // check two common signatures - command and action
  static is(thing: TypeTbD): thing is InPageButtonJson {
    return thing.command !== undefined || thing.action !== undefined;
  }

  static isArray(thing: TypeTbD[]): thing is InPageButtonJson[] {
      return thing.length > 0 && InPageButtonJson.is(thing[0]);
  }

}


// export function isInPageButtonConfiguration(thing: TypeTbD): thing is InPageButtonJson {
//   // check two common signatures - command and action
//   return thing.command !== undefined || thing.action !== undefined;
// }
