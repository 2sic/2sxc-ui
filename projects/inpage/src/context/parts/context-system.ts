import { AttrJsonEditContext, ContextErrorJsonAndObj, ContextProblems } from '../html-attribute';

/**
 * this will be everything about the current system, like system / api -paths etc.
 * @internal
 */
export class ContextOfSystem {
  error: string;

  problems?: ContextProblems[];

  constructor(editCtx: AttrJsonEditContext) {
    this.problems = editCtx.error?.problems;
    if (editCtx.error) {
      this.error = editCtx.error.type;
    }
  }
}
