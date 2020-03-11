import { Settings } from '../../commands/settings';
import { ButtonCommand } from '../button/button-command';
export function oldParametersAdapter(action: ButtonCommand): Partial<Settings> {

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
