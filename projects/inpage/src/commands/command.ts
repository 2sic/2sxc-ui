import tippy, { Props } from 'tippy.js';
import { ContextComplete } from '../context/bundles/context-bundle-button';
import { Button } from '../toolbar/config/button';
import { Note } from '../toolbar/config/Note';
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
        // get the rule and only continue if there is a note attached
        const ui = ContextComplete.getRule(ctx)?.ui;
        let note = (ui?.note as Note);
        
        // if there is no specified note, see if the button definition would have one
        if (!note && more.notes) {
          debugger;
          var notes = more.notes(ctx);
          if (notes && notes.length > 0) note = notes[0];
        }

        // if no note, return
        if (!note?.note) return undefined;

        const allowHtml = note?.asHtml ?? false;

        // see https://atomiks.github.io/tippyjs/v5/all-props/
        let tippyProps: Partial<Props> = {
          // the normal contents to show, maybe with html
          content: note.note,
          // the theme to use - ATM a build in-theme and some custom css in `tippy.scss`
          theme: 'light',
          // use a 'v' arrow at the bottom
          arrow: true,
          // custom delay/linger, default in 0
          delay: [note.delay, note.linger],
          // allow html in the content
          allowHTML: allowHtml,
                          
          // activate these to debug the styling in F12
          // trigger: 'click',
          // hideOnClick: false,
          // interactive: true,

          // custom styling applied when it appears
          onMount: (instance) => {
            // ATM only background color handled
            if (!note?.background) return;
            const content = instance.popper.querySelector('.tippy-content') as HTMLElement;
            // console.log('popper', content);
            content.style.background = note.background;
          }                
        };

        // Experimental 16.02 - ATM used for insights /code-help Tippys only
        if (note.interactive)
          tippyProps = this.tippyMakeInteractive(tippyProps);
        
        // If config has links, add them and enable interactive
        tippyProps = this.tippyAddLinks(tippyProps, note);

        if (debugTippy) console.log('Command-Tippy', note, tippyProps);

        tippy(tag, tippyProps);
        return undefined;
      },
      ...more,
    };
  }

  /**
   * If config has links, add them and enable interactive
   */
  private tippyAddLinks(tippyProps: Partial<Props>, note: Note) {
    // If no links, return
    if (!note.links || note.links.length === 0) return tippyProps;
    // Generate html for the links
    const html = note.links.map(l => `<a class="tippy-button ${l.primary ? 'tippy-button-primary': ''}" href="${l.url}" target="_blank">${l.label ?? '🔗 more'}</a>`);
    return {
      // make interactive
      ...this.tippyMakeInteractive(tippyProps),
      allowHTML: true,
      // content must be repacked, and links added at the bottom.
      content: `<div>${note.note}<div>
      <br>
      <div class="tippy-buttons">${html}</div>`,
    };
  } 

  /**
   * If it needs to be interactive, then changes are made to allow mouse to travel to it.
   * eg. we need to append it to the body
   */
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
    // debug entry
    // if (name == 'layout') {
    //   console.log('test 2dm: ' + name);
    //   debugger;
    // }

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
