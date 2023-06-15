/**
 * @internal
 */
export class ContextErrorJsonAndObj {
  type: string;
  problems?: ContextProblems[];
}


/**
 * Context problems - same type in Json and in object
 * @internal
 */
export class ContextProblems {
  severity: /*'none' | */ 'info' | 'warning' | 'error';
  scope: 'view' | 'app';
  code: string;
  message: string;
  link: string;
}