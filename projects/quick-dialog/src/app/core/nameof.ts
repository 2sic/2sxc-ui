// Inspired by https://schneidenbach.gitbooks.io/typescript-cookbook/content/nameof-operator.html

export const nameof = <T>(name: keyof T) => name;

export const nameofFactory = <T>() => (name: keyof T) => name;
