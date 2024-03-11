// Log Names must be added here, and not in the places where they are used
// Reason is that otherwise we get circular dependencies

export const QuickEClipboardLogId = "Q-E.Clpbrd";

/**
 * Special variable which is filled in during compile by the definePlugin
 */
declare const IsDevBuild: boolean;


/**
 * @internal
 */
export const Debug = {
  isDevBuild: IsDevBuild,
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
    CommandTippy: false,
    [QuickEClipboardLogId]: true,
  }
};
