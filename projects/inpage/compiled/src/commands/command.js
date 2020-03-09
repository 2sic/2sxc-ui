"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ng_dialog_params_1 = require("../manage/ng-dialog-params");
var _2sxc_translate_1 = require("../translate/2sxc.translate");
var Command = /** @class */ (function () {
    function Command(context, ngDialogUrl, isDebug) {
        var _this = this;
        this.context = context;
        this.ngDialogUrl = ngDialogUrl;
        this.isDebug = isDebug;
        this.evalPropOrFunction = function (propOrFunction, context, fallback) {
            if (propOrFunction === undefined || propOrFunction === null) {
                return fallback;
            }
            return (typeof (propOrFunction) === 'function' ? propOrFunction(context) : propOrFunction);
        };
        this.addSimpleItem = function () {
            var item = {};
            var ct = _this.context.button.action.params.contentType || _this.context.button.action.params.attributeSetName; // two ways to name the content-type-name this, v 7.2+ and older
            if (_this.context.button.action.params.entityId) {
                item.EntityId = _this.context.button.action.params.entityId;
            }
            if (ct) {
                item.ContentTypeName = ct;
            }
            // only add if there was stuff to add
            if (item.EntityId || item.ContentTypeName) {
                _this.items.push(item);
            }
        };
        // this adds an item of the content-group, based on the group GUID and the sequence number
        this.addContentGroupItem = function (guid, index, part, isAdd, isEntity, cbid, sectionLanguageKey) {
            _this.items.push({
                Group: {
                    Guid: guid,
                    Index: index,
                    Part: part,
                    Add: isAdd,
                },
                Title: _2sxc_translate_1.translate(sectionLanguageKey),
            });
        };
        // this will tell the command to edit a item from the sorted list in the group, optionally together with the presentation item
        this.addContentGroupItemSetsToEditList = function (withPresentation) {
            var isContentAndNotHeader = (_this.context.button.action.params.sortOrder !== -1);
            var index = isContentAndNotHeader ? _this.context.button.action.params.sortOrder : 0;
            var prefix = isContentAndNotHeader ? '' : 'List';
            var cTerm = prefix + 'Content';
            var pTerm = prefix + 'Presentation';
            var isAdd = _this.context.button.action.name === 'new';
            var groupId = _this.context.contentBlock.contentGroupId;
            _this.addContentGroupItem(groupId, index, cTerm.toLowerCase(), isAdd, _this.context.contentBlock.isEntity, _this.context.contentBlock.id, "EditFormTitle." + cTerm);
            if (withPresentation) {
                _this.addContentGroupItem(groupId, index, pTerm.toLowerCase(), isAdd, _this.context.contentBlock.isEntity, _this.context.contentBlock.id, "EditFormTitle." + pTerm);
            }
        };
        // build the link, combining specific params with global ones and put all in the url
        this.generateLink = function (context) {
            // if there is no items-array, create an empty one (it's required later on)
            if (!context.button.action.params.items) {
                context.button.action.params.items = [];
            }
            //#region steps for all actions: prefill, serialize, open-dialog
            // when doing new, there may be a prefill in the link to initialize the new item
            if (context.button.action.params.prefill) {
                for (var i = 0; i < _this.items.length; i++) {
                    _this.items[i].Prefill = context.button.action.params.prefill;
                }
            }
            _this.params.items = JSON.stringify(_this.items); // Serialize/json-ify the complex items-list
            // clone the params and adjust parts based on partOfPage settings...
            var ngDialogParams = ng_dialog_params_1.NgDialogParams.fromContext(context); // 2dm simplified buildNgDialogParams(context);
            var sharedParams = Object.assign({}, ngDialogParams);
            var partOfPage = context.button.partOfPage(context);
            if (!partOfPage) {
                delete sharedParams.versioningRequirements;
                delete sharedParams.publishing;
                sharedParams.partOfPage = false;
            }
            return _this.ngDialogUrl +
                '#' +
                $.param(sharedParams) +
                '&' +
                $.param(_this.params) +
                _this.isDebug;
            //#endregion
        };
        // this.settings = settings;
        this.items = context.button.action.params.items || []; // use predefined or create empty array
        // todo: stv, clean this
        var params = this.evalPropOrFunction(context.button.params, context, {});
        var dialog = this.evalPropOrFunction(context.button.dialog, context, {});
        this.params = Object.assign({
            dialog: dialog || context.button.action.name,
        }, params);
    }
    return Command;
}());
exports.Command = Command;
//# sourceMappingURL=command.js.map