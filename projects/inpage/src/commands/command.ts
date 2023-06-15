import tippy, { Props } from 'tippy.js';
import { ContextComplete } from '../context/bundles/context-bundle-button';
import { Button } from '../toolbar/config/button';
import { Note } from '../toolbar/config/toolbar-button-settings';
import { Debug } from '../constants/debug';

export const iconPrefix = 'icon-sxc-';
export const tlbI18nPrefix = 'Toolbar.';

const debugTippy = Debug.parts.CommandTippy;

/**
 * @internal
 */
export class Command {
    constructor(public name: string) {
    }

    /** the defaults are important for new buttons that just know this command */
    buttonDefaults: Partial<Button>;

    /**
     * @internal
     */
    mergeDefaults(translateKey: string, icon: string, uiOnly: boolean, partOfPage: boolean, more: Partial<Button>): void {
      if (typeof (partOfPage) !== 'boolean')
        throw 'partOfPage in commands not provided, order will be wrong!';

      this.buttonDefaults = {
            icon: () => `${iconPrefix}${icon}`,
            title: () => `${tlbI18nPrefix}${translateKey}`,
            uiActionOnly: () => uiOnly,
            partOfPage: () => partOfPage,
            color: () => undefined,
            tippy: (ctx, tag) => {
              const ui = ContextComplete.getRule(ctx)?.ui;
              const note = (ui?.note as Note);
              if (!note?.note)
                return undefined;

              let tippyProps: Partial<Props> = {
                content: note.note,
                theme: 'light',
                arrow: true,
                delay: [null, null],
                allowHTML: note?.allowHtml ?? false,
                                
                // activate these to debug the styling in F12
                // trigger: 'click',
                // hideOnClick: false,
                // interactive: true,
                onMount: (instance) => {
                  if (!note?.background) return;
                  const content = instance.popper.querySelector('.tippy-content') as HTMLElement;
                  // console.log('popper', content);
                  content.style.backgroundColor = note.background;
                }                
              };

              // Experimental 16.02
              if (note.interactive)
                tippyProps = this.tippyMakeInteractive(tippyProps);
              
              tippyProps = this.tippyAddLinks(tippyProps, note);

              if (debugTippy) console.log('Command-Tippy', note, tippyProps);

              tippy(tag, tippyProps);
              return undefined;
            },
            ...more,
        };
    }

    private tippyAddLinks(tippyProps: Partial<Props>, note: Note) {
      if (!note.links || note.links.length === 0) return tippyProps;
      const html = note.links.map(l => `<a class="tippy-button ${l.primary ? 'tippy-button-primary': ''}" href="${l.url}" target="_blank">${l.label ?? '🔗 more'}</a>`);
      return {
        ...this.tippyMakeInteractive(tippyProps),
        allowHTML: true,
        content: `<div>${note.note}<div>
        <br>
        <div class="tippy-buttons">${html}</div>`,
      };
    } 

    private tippyMakeInteractive(tippyProps: Partial<Props>) {
      return {
        ...tippyProps,
        interactive: true,
        appendTo: () => document.body,
      };
    }

    /**
     * 
     * @returns 
     * @internal
     */
    static build(name: string,
                 translateKey: string,
                 icon: string,
                 uiOnly: boolean,
                 partOfPage: boolean,
                 more: Partial<Button>,
                 ): Command {

        const cmd = new Command(name);

        // Toolbar API v2
        cmd.mergeDefaults(translateKey, icon, uiOnly, partOfPage, more);

        return cmd;
    }

    /**
     * @internal
     */
    static clone(command: Command, name: string) {
      const clone = new Command(name);
      clone.buttonDefaults = command.buttonDefaults;
      return clone;
    }
}
