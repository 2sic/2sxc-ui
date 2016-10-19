// the toolbar manager is an internal helper
// taking care of toolbars, buttons etc.

(function () {
    var tools = $2sxc._toolbarManager.buttonHelpers = {

        createFlatList: function (unstructuredConfig, actions, itemSettings, config) {
            var clonedSettings = $.extend(true, {}, itemSettings); // make sure I have a clean clone, otherwise it may get modified as I work with it

            var realConfig = tools.ensureHierarchy(unstructuredConfig);

            tools.expandCompactedSyntax(realConfig, actions, clonedSettings);

            var btnList = tools.flattenList(realConfig);

            tools.removeButtonsWithUnmetConditions(btnList, clonedSettings, config);
            return btnList;
        },

        btnCleanVariousInputFormats: function(btn, actions, itemSettings) {
            // warn about buttons which don't have a known action
            tools.btnWarnUnknownAction(btn, actions);

            // enhance the button with settings for this instance
            tools.btnAddItemSettings(btn, itemSettings);

            // ensure all buttons have either own settings, or the fallbacks
            tools.btnAttachMissingSettings(btn, actions);            
        },

        ensureHierarchy: function (original) {
            // original is null/undefined, just return empty set
            if (!original)
                throw ("preparing toolbar, with nothing to work on: " + original);

            // goal: return an object with this structure
            // so we'll import what we can, and check/fix/build what came in differently
            var fullSet = {
                name: original.name || "toolbar",
                groups: original.groups || [],
                defaults: original.defaults || {}
            };

            // not an array, but with property action - with one or more verbs, so it must be a button or a short-list of buttons
            if (!Array.isArray(original) && original.action)
                original = [$.extend({}, original)];

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

        expandCompactedSyntax: function(fullSet, actions, itemSettings) {
            // by now we should have a structure, let's check/fix the buttons
            for (var g = 0; g < fullSet.groups.length; g++) {
                // enhance the group with the context of the other groups it's in
                $2sxc._lib.extend(fullSet.groups[g], { index: g, groups: fullSet.groups });

                // expand a verb-list like "edit,new" into objects like [{ action: "edit" }, {action: "new"}]
                tools.expandBtnVerbs(fullSet.groups[g]);

                // fix all the buttons
                var btns = fullSet.groups[g].buttons;
                if (Array.isArray(btns))
                    for (var b = 0; b < btns.length; b++) {
                        btns[b] = tools.expandFlatBtnDef(btns[b]);
                        tools.btnCleanVariousInputFormats(btns[b], actions, itemSettings);
                    }
            }
        },

        expandFlatBtnDef: function(btn) {
            if (!(btn._expanded || btn.defaults || btn.command) && Object.keys(btn).length > 1) { // has multiple properties but not mapped to defaults
                btn = {
                    action: btn.action,
                    defaults: btn
                };
                delete btn.defaults.action;
            }
            return btn;
        },



        // change a hierarchy of buttons into a flat, simpler list
        flattenList: function (full) {
            var btnGroups = full.groups;
            var flatList = [];
            for (var s = 0; s < btnGroups.length; s++) {
                // first, enrich the set so it knows about it's context
                var grp = btnGroups[s];// $2sxc._lib.extend(btnGroups[s], { index: s, groups: btnGroups});

                // now process the buttons if string-format
                //var btns = grp.buttons;
                //if (typeof btns === "string")
                //    btns = btns.split(",");

                // add each button - check if it's already an object or just the string
                for (var v = 0; v < grp.buttons.length; v++) {
                    //btns[v] = tools.expandButtonConfig(btns[v]);
                    //btns[v].group = grp;    // attach group reference, needed for fallback etc.
                    flatList.push(grp.buttons[v]);
                }
                //grp.buttons = btns; // ensure the internal def is also an array now
            }
            full.flat = flatList;
            return flatList;
        },

        expandBtnVerbs: function(grp) {
            var btns = grp.buttons;
            if (typeof btns === "string")
                btns = btns.split(",");

            // add each button - check if it's already an object or just the string
            for (var v = 0; v < btns.length; v++) {
                btns[v] = tools.expandButtonConfig(btns[v]);
                btns[v].group = grp;    // attach group reference, needed for fallback etc.
            }
            grp.buttons = btns; // ensure the internal def is also an array now
        },

        // takes an object like "actionname" or { action: "actionname", ... } and changes it to a { command: { action: "actionname" }, ... }
        expandButtonConfig: function (original) {
            if (original._expanded)
                return original;

            // if just a name, turn into a command
            if (typeof original === "string")
                original = { action: original };

            // if it's a command w/action, wrap into command + trim
            if (typeof original.action === "string")
                $2sxc._lib.extend(original, { command: { action: original.action.trim() } });

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
        removeButtonsWithUnmetConditions: function(btnList, settings, config) {
            for (var i = 0; i < btnList.length; i++) {
                var add = btnList[i].showCondition;
                if (add !== undefined && (typeof (add) === "function"))
                    if (!add(settings, config)) {
                        btnList.splice(i, 1);
                        i--;
                    }
            }
        },

        btnAddItemSettings: function(btn, itemSettings) {
            //$2sxc._lib.extend(btn.command, itemSettings);
        },

        btnProperties: [
            "classes",
            "icon",
            "title",
            "dynamicClasses",
            "showCondition"
        ],

        actProperties: [
            "params"    // todo: maybe different! DOESN'T WORK YET - MUST IMPLEMENT
        ],

        btnAttachMissingSettings: function(btn, actions) {
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