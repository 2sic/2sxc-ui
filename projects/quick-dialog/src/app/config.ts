import { SxcRoot } from '../../../sxc-typings';
import { urlParams } from './core/constants';

declare const $2sxc: SxcRoot;

export class Config {
  static appId = () => parseInt(get(urlParams.appId));
  static apps = () => get(urlParams.apps);

  static moduleId = () => Number(req(urlParams.moduleId));
  static cbId = () => Number(req(urlParams.contentBlockId));

  static getSxcInstance = () => $2sxc(Config.moduleId(), Config.cbId());
}


function req(key) { return $2sxc.urlParams.require(key); }

function get(key) { return $2sxc.urlParams.get(key); }
