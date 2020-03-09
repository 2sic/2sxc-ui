import { CbOrMod } from './cb-or-mod';

/**
 * Selectors class used to host all QickE selectors in one place
 */
export class Selectors {
  cb: CbOrMod;
  mod: CbOrMod;
  eitherCbOrMod: string;
  selected: string;

  [propName: string]: any;
}
