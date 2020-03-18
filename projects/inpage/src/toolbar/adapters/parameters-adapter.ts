import { InPageCommandJson } from '../config-inpage/in-page-command';

export function removeActionProperty(oldParameters: InPageCommandJson): InPageCommandJson {
//   const newParams = oldParameters;
  // some clean-up
  delete oldParameters.action; // remove the action property
  return oldParameters;
}
