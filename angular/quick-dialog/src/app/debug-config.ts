
/** configuration what to debug directly to the screen and what to keep secret */
export const DebugConfig = {
  /** should we stream messages directly to console */
  live: false,

  /** should we log logger events */
  log: false,

  /** api debugging */
  api: false,
  apiStreams: false,

  /** template picker */
  picker: { 
    enabled: false,
    streams: false
  },
  showInUi: false,

  /** template state */
  state: true,
  stateStreams: false,
  stateInits: false,

  /** content-type processor */
  ctProcessor: false,
};
