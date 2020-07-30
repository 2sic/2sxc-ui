
/** configuration what to debug directly to the screen and what to keep secret */
export const DebugConfig = {

  /** logger configuration */
  logger: {
    /** should we stream messages directly to console */
    logToConsole: false,
    /** should we also log internal events */
    internals: false,
    /** allow url param ?debug=true to turn on logging */
    urlDebugEnablesAll: true,
    /** if url param ?debug=true also enables all live-logging */
    urlDebugActivatesLive: true
  },

  /** api debugging */
  api: {
    enabled: false,
    streams: false,
  },

  /** template picker */
  picker: {
    enabled: false,
    streams: false,
    showDebugPanel: false
  },

  /** template state */
  state: {
    enabled: false,
    streams: false,
    inits: false,
  },

  /** content-type processor */
  typeProcessor: false,
  /** template processor */
  templateProcessor: false,
};
