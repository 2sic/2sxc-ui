import { SxcRoot } from '../../../sxc-typings';
import { urlParams } from './core/constants';

declare const $2sxc: SxcRoot;

export class Config {
  static appId = () => get(urlParams.appId);
  static apps = () => get(urlParams.apps);

  // 2021-01-18 static item = () => JSON.parse(req('items'))[0];

  static moduleId = () => Number(req(urlParams.moduleId));
  static cbId = () => Number(req(urlParams.contentBlockId));
  // 2021-01-18 static dialog = () => req('dialog');

  static getSxcInstance = () => $2sxc(Config.moduleId(), Config.cbId());
}


function req(key) { return $2sxc.urlParams.require(key); }

function get(key) { return $2sxc.urlParams.get(key); }
