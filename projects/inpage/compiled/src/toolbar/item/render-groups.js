"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var render_button_1 = require("./render-button");
/**
 * render groups of buttons in toolbar
 * @param sxc
 * @param toolbarConfig
 */
function renderGroups(context) {
    var groupsBuffer = []; // temporary storage for detached HTML DOM objects
    var btnGroups = context.toolbar.groups;
    for (var i = 0; i < btnGroups.length; i++) {
        var btns = btnGroups[i].buttons;
        for (var h = 0; h < btns.length; h++) {
            context.button = btns[h];
            // create one button
            var button = render_button_1.renderButton(context, i);
            // add button to group of buttons
            var item = document.createElement('li');
            item.appendChild(button);
            groupsBuffer.push(item);
        }
    }
    return groupsBuffer;
}
exports.renderGroups = renderGroups;
//# sourceMappingURL=render-groups.js.map