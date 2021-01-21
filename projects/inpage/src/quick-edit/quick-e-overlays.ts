export interface QuickEditSelectionOverlay extends JQuery {
  toggleOverlay(target: boolean | JQuery): void;
  target: JQuery;
}

export interface QuickEditMainOverlay extends JQuery {
  activeContentBlock: JQuery;
  activeModule: JQuery;
  parentNode: HTMLElement;
}
