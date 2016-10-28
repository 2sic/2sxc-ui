// the toolbar manager is an internal helper
// taking care of toolbars, buttons etc.

(function () {
    var tools = $2sxc._toolbarManager.buttonHelpers = {

        // take any common input format and convert it to a full toolbar-structure definition
        // can handle the following input formats (the param unstructuredConfig):
        // complete tree (detected by "groups): { name: ..., groups: [ {}, {}], defaults: {...} } 
        // group of buttons (detected by "buttons): { name: ..., buttons: "..." | [] }
        // list of buttons (detected by IsArray): [ { action: "..." | []}, { action: ""|[]} ]
        // button (detected by "command"): { command: ""|[], icon: "..", ... }
        // just a command (detected by "action"): { entityId: 17, action: "edit" }
        // array of commands/buttons: [{entityId: 17, action: "edit"}, {contentType: "blog", action: "new"}]
        buildFullDefinition: function (unstructuredConfig, actions, config) {
            var fullConfig = tools.ensureDefinitionTree(unstructuredConfig);
            tools.expandButtonGroups(fullConfig, actions);
            tools.removeButtonsWithUnmetConditions(fullConfig, config);
            return fullConfig;
        },

        // this will take an input which could already be a tree, but it could also be a 
        // button-definition, or just a string, and make sure that afterwards it's a tree with groups
        // the groups could still be in compact form, or already expanded, dependending on the input
        ensureDefinitionTree: function (original) {
            // original is null/undefined, just return empty set
            if (!original) throw ("preparing toolbar, with nothing to work on: " + original);

            // goal: return an object with this structure
            // so we'll import what we can, and check/fix/build what came in differently
            var fullSet = {
                name: original.name || "toolbar",
                groups: original.groups || [],
                defaults: original.defaults || {},      // the button defaults like icon, etc.
                parameters: original.parameters || {}   // these are the default command parameters
            };

            // not an array, but with property action - with one or more verbs, so it must be a button or a short-list of buttons
            if (!Array.isArray(original) && original.action)
                original = [original];

            // a simple case: arrays of either buttons or button-groups, having at least 1 item
            if (Array.isArray(original) && original[0]) {
                // an array of items having buttons, so it must be button-groups
                if (original[0].buttons)
                    fullSet.groups = original;

                // array of items having an action, so these are buttons
                else if (original[0].action) 
                    fullSet.groups.push({ buttons: original });
            }

            return fullSet;
        },

        // this will traverse a groups-tree and expand each group
        // so if groups were just strings like "edit,new" or compact buttons, they will be expanded afterwards
        expandButtonGroups: function(fullSet, actions){ //, itemSettings) {
            // by now we should have a structure, let's check/fix the buttons
            for (var g = 0; g < fullSet.groups.length; g++) {
                // expand a verb-list like "edit,new" into objects like [{ action: "edit" }, {action: "new"}]
                tools.expandButtonList(fullSet.groups[g]);

                // fix all the buttons
                var btns = fullSet.groups[g].buttons;
                if (Array.isArray(btns))
                    for (var b = 0; b < btns.length; b++) {
                        tools.btnWarnUnknownAction(btns[b], actions);       // warn about buttons which don't have a known action
                        $2sxc._lib.extend(btns[b].command, fullSet.parameters);     // enhance the button with settings for this instance
                        tools.addDefaultBtnSettings(btns[b], actions);   // ensure all buttons have either own settings, or the fallbacks
                    }
            }
        },

        // take a list of buttons (objects OR strings)
        // and convert to proper array of buttons with actions
        expandButtonList: function (grp) {
            var root = grp; // the root object which has all params of the command
            var btns = root.buttons;
            if (Array.isArray(btns) && btns.length === 1 && btns[0].action) { // if btns. is neither array nor string, it's a short-hand with action names
                root = btns[0];
                btns = root.action;
            }

            var cmdTemplate = null;
            if (typeof btns === "string") {
                btns = btns.split(",");
                cmdTemplate = $.extend({}, root);  // inherit all fields used in the button
                delete cmdTemplate.buttons; // this one's not needed
                delete cmdTemplate.name;    // this one's not needed
                delete cmdTemplate.action;  //
            }

            // add each button - check if it's already an object or just the string
            for (var v = 0; v < btns.length; v++) {
                btns[v] = tools.expandButtonConfig(btns[v], cmdTemplate);
                btns[v].group = grp;    // attach group reference, needed for fallback etc.
            }
            grp.buttons = btns; // ensure the internal def is also an array now
        },

        // takes an object like "actionname" or { action: "actionname", ... } and changes it to a { command: { action: "actionname" }, ... }
        expandButtonConfig: function (original, cmdTemplate) {
            if (original._expanded)
                return original;

            // if just a name, turn into a command
            if (typeof original === "string")
                original = { action: original };

            // if it's a command w/action, wrap into command + trim
            if (typeof original.action === "string") {
                original.action = original.action.trim();
                $2sxc._lib.extend(original, {
                    command: $2sxc._lib.extend({}, cmdTemplate, original)   // merge template w/action
                });
            }
            // some clean-up
            delete original.action;  // remove the action property
            original._expanded = true;
            return original;
        },

        btnWarnUnknownAction: function(btn, actions) {
            if (!(actions[btn.command.action]))
                console.log("warning: toolbar-button with unknown action-name: '" + btn.command.action);
        },

        // remove buttons which are not valid based on add condition
        removeButtonsWithUnmetConditions: function (full, config) {
            var btnGroups = full.groups;
            for (var g = 0; g < btnGroups.length; g++) {
                var btns = btnGroups[g].buttons;
                tools.removeButtonsIfAddUnmet(btns, config);

                // remove the group, if no buttons left, or only "more"
                if (btns.length === 0 || (btns.length === 1 && btns[0].command.action === "more"))
                    btnGroups.splice(g--, 1);   // remove, and decrement counter
            }
        },

        removeButtonsIfAddUnmet(btns, config) {
            for (var i = 0; i < btns.length; i++) {
                var add = btns[i].showCondition;
                if (add !== undefined && (typeof (add) === "function"))
                    if (!add(btns[i].command, config))
                        btns.splice(i--, 1);
            }
        },

        btnProperties: [
            "classes",
            "icon",
            "title",
            "dynamicClasses",
            "showCondition"
        ],
        prvProperties: [
            "defaults"
        ],

        addDefaultBtnSettings: function(btn, actions) {
            for (var d = 0; d < tools.btnProperties.length; d++)
                tools.fallbackOneSetting(btn, actions, tools.btnProperties[d]);
        },

        // configure missing button properties with various fallback options
        fallbackOneSetting: function(btn, actions, propName) {
            btn[propName] = btn[propName]   // by if already defined, use the already defined propery
                || (btn.group.defaults && btn.group.defaults[propName])     // if the group has defaults, try use use that property
                || (btn.group.groups && btn.group.groups.defaults && btn.group.groups.defaults[propName])     // if the group has defaults, try use use that property
                || (actions[btn.command.action] && actions[btn.command.action][propName]); // if there is an action, try to use that property name
        }
    };

})();