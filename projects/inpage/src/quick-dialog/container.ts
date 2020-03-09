import * as ContainerSize from './container-size';
import * as DialogFrameElement from './iDialogFrameElement';
import * as Iframebridge from './iframe-bridge';
import IDialogFrameElement = DialogFrameElement.IDialogFrameElement;


/**
 * this is a dialog manager which is in charge of all quick-dialogues
 * it always has a reference to the latest dialog created by any module instance
 */

const containerClass = 'inpage-frame-wrapper';
const iframeClass = 'inpage-frame';
const iframeTag = 'iframe';
const containerTemplate = `<div class="${containerClass}"><div class="${iframeClass}"></div></div>`;

/**
 * get the current container
 * @returns {element} html element of the div
 */
export function getOrCreate(): JQuery<HTMLElement> {
  const container = $(`.${containerClass}`);
  return container.length > 0 ? container : buildContainerAndIFrame();
}

/**
 * find the iframe which hosts the dialog
 * @param {html} [container] - html-container as jQuery object
 * @returns {html} iframe object
 */
export function getIFrame(container?: JQuery): IDialogFrameElement {
  if (!container) container = getOrCreate();
  return container.find(iframeTag)[0] as IDialogFrameElement;
}


/**
 * build the container in the dom w/iframe for re-use
 * @return {jquery} jquery dom-object
 */
function buildContainerAndIFrame(): JQuery<HTMLElement> {
  const container = $(containerTemplate);
  if ($("#personaBar-iframe").length > 0)
    container.addClass("persona-bar-visible");
  const newIFrame = document.createElement(iframeTag);
  const extendedIFrame = Iframebridge.build(newIFrame);
  container.find(`.${iframeClass}`).append(extendedIFrame);
  $('body').append(container);
  ContainerSize.watchForResize(container);
  return container;
}
