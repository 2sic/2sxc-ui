import { RunParams } from '../../commands/run-params';
import { ButtonCommand } from '../button/button-command';


export function oldParametersAdapter(action: ButtonCommand): Partial<RunParams> {

  const params: Partial<RunParams> = {};

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
