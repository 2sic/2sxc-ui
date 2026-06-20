import { AttrJsonEditContext, ContextErrorJsonAndObj, ContextProblems } from '../html-attribute';

/**
 * this will be everything about the current system, like system / api -paths etc.
 * @internal
 */
export interface ContextOfSystem {
  error: string;

  problems?: ContextProblems[];

  // constructor(editCtx: AttrJsonEditContext) {
  //   this.problems = editCtx.error?.problems;
  //   if (editCtx.error) {
  //     this.error = editCtx.error.type;
  //   }
  // }
}

export function createContextOfSystem(editCtx: AttrJsonEditContext): ContextOfSystem {
  return {
    problems: editCtx.error?.problems,
    error: editCtx.error?.type,
  } satisfies ContextOfSystem;
}