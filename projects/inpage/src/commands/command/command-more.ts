﻿import { CommandNames, Commands } from '..';
import { C } from '../../constants';
import { IDs } from '../../constants/ids';


/**
 * import this module to commands.ts
 * @internal
 */
Commands.add(CommandNames.more, 'MoreActions', 'options btn-mode', true, false, {
  code(context, event) {
    return new Promise((resolve, reject) => {
      const btn2 = event.target as HTMLElement;
      const fullMenu2 = btn2.closest(IDs.sel.tagScMenu) as HTMLElement;
      const oldState2 = Number(fullMenu2.getAttribute('data-state') || 0);
      const max2 = Number(fullMenu2.getAttribute('group-count'));
      const newState2 = (oldState2 + 1) % max2;

      fullMenu2.classList.remove(`group-${oldState2}`);
      fullMenu2.classList.add(`group-${newState2}`);
      fullMenu2.setAttribute('data-state', String(newState2));

      event.preventDefault();

      function mouseenterHandler(e: MouseEvent) {
        fullMenu2.style.opacity = '1';
      }

      function mouseleaveHandler(e: MouseEvent) {
        if (e.screenX !== 0 && e.screenY !== 0) {
          // hide toolbar on mouseleave
          fullMenu2.style.opacity = '0';
        } else {
          // this is fix for Chrome issue
          // ensure to show toolbar because X=0 and Y=0
          fullMenu2.style.opacity = '1';
          console.warn(
            'workaround for toolbar hide onmouseleave issue',
            e.screenX,
            e.screenY,
            e.target,
          );
        }
      }

      // because of issue in Chrome we need to override CSS rules in edit.css for toolbar toggle on mouse hover
      const scElement = fullMenu2.closest(
        '.' + C.Toolbar.classes.oldHover,
      );
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
