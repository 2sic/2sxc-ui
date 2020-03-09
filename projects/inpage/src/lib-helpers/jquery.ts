/**
 * jquery helper
 */
//declare let $: any;

interface JQueryStatic {
  // the generator for the DNN ServicesFramework
// ReSharper disable once InconsistentNaming
  dnnSF: any,

  // The DNN Services Framework
// ReSharper disable once InconsistentNaming
  ServicesFramework: any,

  // the translations extension on jquery
  t: any,
}

interface JQuery<TElement = HTMLElement> {
  parentContainer: any,
  actionsForModule: any,
  localize: any,
  actionsForCb: any,
}

interface JQueryXHR {
  // not sure if this is right, but otherwise typescript doesn't like our code
  success: any,
}