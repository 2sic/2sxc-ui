import { WorkflowArguments } from '.';

/**
 * @internal
 */
export type PromiseFactory<T> = (args: T) => Promise<T>;

/**
 * @internal
 */
export type WorkflowPromiseFactory = PromiseFactory<WorkflowArguments>;

/**
 * Signature of your code which is used in workflows.
 * Basically it's just a function receiving [](xref:Api.Js.InPage.WorkflowArguments)
 * @internal
 * Doc Notes: it must be internal, as docFx cannot process types, so it's documented there
 */
export type WorkflowCode = (args: WorkflowArguments) => WorkflowArguments;
