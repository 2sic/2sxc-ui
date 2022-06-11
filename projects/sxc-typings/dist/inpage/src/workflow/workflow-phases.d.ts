/**
 * Phases / events of a specific workflow.
 * @export
 * @enum {number}
 */
export declare enum WorkflowPhases {
    /**
     * Run at every phase - before and after
     */
    all = "all",
    /**
     * Run before the event
     */
    before = "before",
    /**
     * Run after the event
     */
    after = "after"
}
