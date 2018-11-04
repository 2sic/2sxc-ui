
/** configuration what to debug directly to the screen and what to keep secret */
export const DebugConfig = {
  live: true,
  log: true,

  // api debugging
  api: false,
  apiStreams: false,

  // template picker
  picker: { 
    enabled: true,
    streams: true
  },
  showInUi: false,

  // template state
  state: true,
  stateStreams: false,
  stateInits: false,

  // content-type processor
  ctProcessor: false,
};
