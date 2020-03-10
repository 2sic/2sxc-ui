import { Settings } from '../../commands/settings';
import { ButtonAction } from '../button/button-action';
export function oldParametersAdapter(action: ButtonAction): Partial<Settings> {

  const params: Partial<Settings> = {};

  if (action) {

    if (action.name) {
      params.action = action.name;
    }

    if (action.params) {
      Object.assign(
        params,
        action.params);
    }
  }

  return params;
}
