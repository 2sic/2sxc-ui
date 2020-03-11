import { InPageCommandConfiguration } from '../config/command/in-page-command';

export function removeActionProperty(oldParameters: InPageCommandConfiguration): InPageCommandConfiguration {
//   const newParams = oldParameters;
  // some clean-up
  delete oldParameters.action; // remove the action property
  return oldParameters;
}
