import { QuickEditConfig } from '.';

export interface QuickEditSelectionOverlay extends JQuery {
  toggleOverlay(target: boolean | JQuery, buttons?: QuickEditConfig.Buttons): void;
  target: JQuery;
}

export interface QuickEditMainOverlay extends JQuery {
  activeContentBlock: JQuery;
  activeModule: JQuery;
  parentNode: HTMLElement;
}
