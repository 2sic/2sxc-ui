/**
 * @internal
 */
export const Debug = {
  cms: {
    autoDump: false,
    run: true,
  },

  // Full debug on specific parts of the code
  // should always be empty in production
  parts: {
    commandInfo: false,
    ToolbarConfigLoaderV10: false,
    RuleManager: false,
  }
};
