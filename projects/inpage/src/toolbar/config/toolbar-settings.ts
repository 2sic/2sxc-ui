import { TypeSafeAssign } from '../../plumbing/type-safe-assign';
import { ToolbarInitConfig } from '../initialize/toolbar-init-config';
import { ToolbarTemplate } from '../templates/toolbar-template-toolbar';

/** contains toolbar behaviour settings like float, etc. */
export class ToolbarSettings {
  autoAddMore: null | 'start' | 'end' | true = null; //  [true: used to be right/start]
  hover: 'left' | 'right' | 'none' = 'right';
  show: 'always' | 'hover' = 'hover';
  classes: string = '';
  constructor(toolbarSettings?: Partial<ToolbarSettings>) {
    if (toolbarSettings) {
        TypeSafeAssign(this, toolbarSettings);
    //   O.bject.assign(this, toolbarSettings);
    }
  }
}

// ToDo: refactor to avoid side-effects
export const defaultToolbarSettings = new ToolbarSettings({
  autoAddMore: null, // null | 'start' | 'end' | true
  hover: 'right', // 'left' |'right' | 'none'
  show: 'hover', // 'always' | 'hover'
});

/** default / fallback settings for toolbars when nothings is specified */
export const settingsForEmptyToolbar = new ToolbarSettings({
  autoAddMore: 'start', // ex: 'left'
  hover: 'left',
  show: 'hover',
});

export const emptyToolbar = {
  toolbar: {} as ToolbarTemplate,
  settings: settingsForEmptyToolbar,
} as ToolbarInitConfig;
