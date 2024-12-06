/** @internal */
export class AssetsLoader {

  /** Asynchronously runs external and inline scripts in series */
  static runScripts(scripts: HTMLScriptElement[], callback: () => void): void {
    const script = scripts[0];
    const others = scripts.slice(1);
    if (script == null) {
      callback?.();
      return;
    }

    // create copy
    const copy = document.createElement('script');
    // attributes
    Array.from(script.attributes).forEach((attribute) => {
      copy.setAttribute(attribute.nodeName, attribute.nodeValue);
    });
    // inline part
    copy.textContent = script.textContent;

    // if src then insert in head, wait for onload or onerror, remove from head and move to next one
    if (copy.type && copy.src) {
      const listener = () => {
        copy.onload = null;
        copy.onerror = null;
        document.head.removeChild(copy);
        this.runScripts(others, callback);
      };
      copy.onload = listener;
      copy.onerror = listener;
      document.head.appendChild(copy);
      return;
    }

    // if no src then inline, insert to head and remove instantly and move to next one
    setTimeout(() => {
      document.head.appendChild(copy);
      document.head.removeChild(copy);
      this.runScripts(others, callback);
    });
  }
}
