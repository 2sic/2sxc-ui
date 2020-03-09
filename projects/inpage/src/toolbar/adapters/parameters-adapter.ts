export function parametersAdapter(oldParameters: any): any {
  const newParams = oldParameters;
  // some clean-up
  delete newParams.action; // remove the action property
  return newParams;
}
