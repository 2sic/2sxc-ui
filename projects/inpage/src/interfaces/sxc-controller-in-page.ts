﻿import { SxcRootWithInternals } from '../../../$2sxc/src/index';
import { Cms } from '../cms/Cms';
import { ContextComplete } from '../context/bundles/context-bundle-button';
import { Manage } from '../manage/manage';
import { SystemUpgrader } from '../system/2sxc.system';
import { SxcEdit } from './sxc-instance-editable';
import { windowInPage as window } from './window-in-page';


/**
 * $2sxc interface declaration merging for in-page
 */
// ReSharper disable InconsistentNaming
export interface SxcRoot extends SxcRootWithInternals {
  /**
   * Get's an SxcInstance
   * @param id number | HTMLElement
   * @param cbid number
   * @returns SxcInstance
   */
  (id: number | HTMLElement | JQuery, cbid?: number): SxcEdit;
//   insights: typeof Insights;
  _manage: Manage;
  system: SystemUpgrader;
  translate(key: string): string;
  context: typeof ContextComplete.findContext;
  cms: Cms;
}
// ReSharper restore InconsistentNaming

export const $2sxcInPage: SxcRoot = window.$2sxc;

export const $jq = $; // window.$2sxc.jq(); // as JQueryStatic;

export const $original = $;
