import { WorkflowStepCodeArguments } from '.';
/**
 * @internal
 */
export declare type PromiseFactory<T> = (args: T) => Promise<T>;
/**
 * @internal
 */
export declare type WorkflowPromiseFactory = PromiseFactory<WorkflowStepCodeArguments>;
/**
 * Signature of your code which is used in workflows.
 * Basically it's just a function receiving [](xref:Api.Js.SxcJs.WorkflowStepCodeArguments)
 * @internal
 * Doc Notes: it must be internal, as docFx cannot process types, so it's documented there
 */
export declare type WorkflowStepCode = (args: WorkflowStepCodeArguments) => WorkflowStepCodeArguments;
