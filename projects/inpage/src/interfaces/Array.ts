// https://stackoverflow.com/questions/31455805/find-object-in-array-using-typescript
interface Array<T> {
  find(predicate: (search: T) => boolean): T;
}
