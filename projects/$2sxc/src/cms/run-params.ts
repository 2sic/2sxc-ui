
// IMPORTANT
// This is just part of the interface. The other part is in the inpage project
// Because it will need even more types, which are not defined here


/**
 * Parameters for the Instance cms.run(...) command.
 * New in 13.03
 * @internal
 */
 export interface RunParams {
    /**
     * The action to perform.
     * Required if you don't have params which themselves have the action
     */
    action?: string;
  
    /**
     * The event which triggered this command - sometimes useful internally further use.
     * Optional in most cases, but in some cases it will improve the behavior of the code.
     */
    event?: MouseEvent;
  
    // REMEMBER
    // The real interface has much more than just this!
}