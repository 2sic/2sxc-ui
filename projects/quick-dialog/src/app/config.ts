import { SxcRoot } from '../../../sxc-typings';

declare const $2sxc: SxcRoot;

export class Config {
  static appId = () => get('appId');
  static apps = () => get('apps');

  static item = () => JSON.parse(req('items'))[0];

  static lang = () => req('lang').split('-')[0];
  static langPri = () => req('langpri').split('-')[0];

  static moduleId = () => Number(req('mid'));
  static cbId = () => Number(req('cbid'));
  static dialog = () => req('dialog');
}


function req(key) { return $2sxc.urlParams.require(key); }

function get(key) { return $2sxc.urlParams.get(key); }
