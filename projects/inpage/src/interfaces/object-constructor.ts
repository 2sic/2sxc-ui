// https://stackoverflow.com/questions/38860161/using-typescript-and-object-assign-gives-me-an-error-property-assign-does-no
interface ObjectConstructor {
  assign(...objects: Object[]): Object;
}
