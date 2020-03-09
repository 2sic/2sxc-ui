import { Conf } from './conf';
import { $quickE as quickE } from './quick-e';
import { selectors } from './selectors-instance';

const configAttr: string = 'quick-edit-config';

/**
 * the initial configuration
 */
const conf = quickE.config = {
  enable: true,
  innerBlocks: {
    enable: null, // default: auto-detect
  },
  modules: {
    enable: null, // default: auto-detect
  },
} as Conf;

export function _readPageConfig() {
  const configs /*: Conf[]*/ = $(`[${configAttr}]`);
  let confJ: string;

  // any inner blocks found? will currently affect if modules can be inserted...
  const hasInnerCBs = ($(selectors.cb.listSelector).length > 0);

  if (configs.length > 0) {
    // go through reverse list, as the last is the most important...
    const finalConfig = {} as Conf;
    for (let c = configs.length; c >= 0; c--) {
      confJ = configs[0].getAttribute(configAttr);
      try {
        const confO = JSON.parse(confJ) as Conf;
        Object.assign(finalConfig, confO);
      } catch (e) {
        console.warn('had trouble with json', e);
      }
    }
    Object.assign(conf, finalConfig);
  }

  // re-check "auto" or "null"
  // if it has inner-content, then it's probably a details page, where quickly adding modules would be a problem, so for now, disable modules in this case
  if (conf.modules.enable === null || conf.modules.enable === 'auto') conf.modules.enable = !hasInnerCBs;

  // for now, ContentBlocks are only enabled if they exist on the page
  if (conf.innerBlocks.enable === null || conf.innerBlocks.enable === 'auto') conf.innerBlocks.enable = hasInnerCBs;
}
