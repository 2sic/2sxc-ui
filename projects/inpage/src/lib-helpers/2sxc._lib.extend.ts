// ReSharper disable once UnusedParameter
export function
  extend(...args: any[]) { // same as angular.extend or jquery.extend, but without that additional dependency
  for (let i = 1; i < arguments.length; i++)
    for (let key in arguments[i])
      if (arguments[i].hasOwnProperty(key))
        arguments[0][key] = arguments[i][key];
  return arguments[0];
}
