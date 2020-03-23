
// experimental
// see https://schneidenbach.gitbooks.io/typescript-cookbook/nameof-operator.html
// not ideal, because it only works on public members
export const nameofFactory = <T>() => (name: keyof T) => name;
