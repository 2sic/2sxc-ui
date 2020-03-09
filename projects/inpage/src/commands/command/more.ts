import * as Constants from '../../constants';
import { CommandBase } from '../command-base';

/**
 * import this module to commands.ts
 */
export class More extends CommandBase {
  constructor() {
    super();
    this.makeDef(
      'more',
      'MoreActions',
      'options btn-mode',
      true,
      false,
      {
        code(context, event) {
          return new Promise((resolve, reject) => {
            const btn2: Element = event.target;
            const fullMenu2: Element = btn2.closest('ul.sc-menu');
            const oldState2 = Number(fullMenu2.getAttribute('data-state') || 0);
            const max2 = Number(fullMenu2.getAttribute('group-count'));
            const newState2 = (oldState2 + 1) % max2;

            fullMenu2.classList.remove(`group-${oldState2}`);
            fullMenu2.classList.add(`group-${newState2}`);
            fullMenu2.setAttribute('data-state', String(newState2));

            event.preventDefault();

            function mouseenterHandler(e: MouseEvent) {
              (fullMenu2 as HTMLElement).style.opacity = '1';
            }

            function mouseleaveHandler(e: MouseEvent) {
              if (e.screenX != 0 && e.screenY != 0) {
                // hide toolbar on mouseleave
                (fullMenu2 as HTMLElement).style.opacity = '0';
              } else {
                // this is fix for Chrome issue
                // ensure to show toolbar because X=0 and Y=0
                (fullMenu2 as HTMLElement).style.opacity = '1';
                console.warn('workaround for toolbar hide onmouseleave issue', e.screenX, e.screenY, e.target);
              }
            }

            // because of issue in Chrome we need to override CSS rules in edit.css for toolbar toggle on mouse hover
            const scElement = fullMenu2.closest('.' + Constants.toolbar.classes.oldHover);
            // add mouseenter and mouseleave events to parent sc-element if not already added
            if (scElement && fullMenu2.getAttribute('listener') !== 'true') {
              scElement.addEventListener('mouseenter', mouseenterHandler);
              scElement.addEventListener('mouseleave', mouseleaveHandler);
              fullMenu2.setAttribute('listener', 'true'); // flag that events are added
            }

            resolve();
          });
        },
      });
  }
}

// ReSharper disable once UnusedLocals
const cmd = new More();
