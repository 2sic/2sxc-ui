import * as Container from './container';
/**
 * this is a dialog manager which is in charge of all quick-dialogues
 * it always has a reference to the latest dialog created by any module instance
 */
let isFullscreen: boolean = false;


/**
 * set container css for size
 * @param {boolean} fullScreen
 */
export function setSize(fullScreen: boolean): void {
  const container = Container.getOrCreate();
  // set container height
  container.css('min-height', fullScreen ? '100%' : '225px');
  isFullscreen = fullScreen;
}




const resizeInterval: number = 200;
let resizeWatcher: number = null;

/**
 * create watcher which monitors the iframe size and adjusts the container as needed
 */
export function watchForResize(container: JQuery<HTMLElement>): void {

  if (!resizeWatcher) // only add a timer if not already running
    resizeWatcher = window.setInterval(() => {
      try {
        const frm: any = Container.getIFrame(container);
        if (!frm) return;

        const height: number = frm.contentDocument.body.offsetHeight;
        if (frm.previousHeight === height) return;
        frm.style.minHeight = container.css('min-height');
        frm.style.height = height + 'px';
        frm.previousHeight = height;
        if (isFullscreen) {
          frm.style.height = '100%';
          frm.style.position = 'absolute';
        }
      } catch (e) {
        // ignore
      }
    }, resizeInterval);
}
