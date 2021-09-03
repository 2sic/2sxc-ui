import * as Public from '../../../sxc-typings/index';
import { Log } from '..';
import { EnvironmentMetaLoader } from './env-loader-meta';

const InputValue = 'value';

const SelectorInputRvt = `input[name=__RequestVerificationToken]`;

/**
 * Special loader for dynamic pages like Oqtane, where content can change at runtime
 */
export class EnvironmentLoaderDynamic {

  public log: Log;

  constructor(
      private mainLoader: EnvironmentMetaLoader
  ) {
    this.log = new Log('ldr.dynmic', mainLoader.log);
  }

  /**
   * Watch for changes in our special meta header, to update the variables.
   * Important for Oqtane, which changes the page on the fly without reloading.
   */
  public startMetaTagObserver(attribute: string): void {
    if (!!this.observer) return;
    this.observer = new MutationObserver((mutationsList: MutationRecord[]) => {
      for(const mut of mutationsList)
        if (mut.type === 'attributes' && mut.attributeName === attribute)
          this.mainLoader.updateEnv(JSON.parse(this.mainLoader.getMetaContent()) as Public.JsInfo)
    });
    this.log.add('start observing meta tag');
    this.observer.observe(this.mainLoader.getJsApiMetaTag(), { attributes: true, childList: false, subtree: false });
  }
  private observer: MutationObserver;

  /**
   * Load RequestVerificationToken from the hidden form-field in Oqtane
   */
  public startInputRvtObserver(): void {
    if (!!this.inputRvtObserver) return;
    this.inputRvtObserver = new MutationObserver((mutationsList: MutationRecord[]) => {
      for(const mut of mutationsList)
        if (mut.type === 'attributes' && mut.attributeName === InputValue)
          this.loadRvtFromHiddenInput(mut.target as HTMLInputElement);
    });
    this.log.add('start observing Rvt Input');
    const hiddenField = document.querySelector(SelectorInputRvt);
    this.loadRvtFromHiddenInput(hiddenField as HTMLInputElement);
    this.inputRvtObserver.observe(hiddenField, { attributes: true, childList: false, subtree: false });
  }
  private inputRvtObserver: MutationObserver;

  private loadRvtFromHiddenInput(input: HTMLInputElement){
    this.log.add('Input Rvt updated');
    if(input && input.value)
      this.mainLoader.env.updateRvt(input.value);
  }
}
