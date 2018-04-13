/*
paste.js is an interface to read image from clipboard in different browsers. It also contains several hacks.
implementation is based on https://github.com/layerssss/paste.js
*/

(function () {
    var $ = window.jQuery;

    $.paste = function (pasteContainer) {
        var pm = Paste.mountNonInputable(pasteContainer);
        return pm._container;
    };

    $.fn.pastableNonInputable = function () {
        var el, j, len;
        var ref = this;

        for (j = 0, len = ref.length; j < len; j++) {
            el = ref[j];
            if (el._pastable || $(el).is('textarea, input:text, [contenteditable]')) {
                continue;
            }
            Paste.mountNonInputable(el);
            el._pastable = true;
        }
        return this;
    };

    $.fn.pastableTextarea = function () {
        var el, j, len;
        var ref = this;

        for (j = 0, len = ref.length; j < len; j++) {
            el = ref[j];
            if (el._pastable || $(el).is(':not(textarea, input:text)')) {
                continue;
            }
            Paste.mountTextarea(el);
            el._pastable = true;
        }
        return this;
    };

    $.fn.pastableContenteditable = function () {
        var el, j, len;
        var ref = this;

        for (j = 0, len = ref.length; j < len; j++) {
            el = ref[j];
            if (el._pastable || $(el).is(':not([contenteditable])')) {
                continue;
            }
            Paste.mountContenteditable(el);
            el._pastable = true;
        }
        return this;
    };

    var createHiddenEditable = function () {
        return $(document.createElement('div')).attr('contenteditable', true).attr('aria-hidden', true).attr('tabindex', -1).css({
            width: 1,
            height: 1,
            position: 'fixed',
            left: -100,
            overflow: 'hidden',
            opacity: 1e-17
        });
    };

    var isFocusable = function (element, hasTabindex) {
        var fieldset;
        var focusableIfVisible;
        var map;
        var mapName;
        var img;
        var nodeName = element.nodeName.toLowerCase();

        if ('area' === nodeName) {
            map = element.parentNode;
            mapName = map.name;
            if (!element.href || !mapName || map.nodeName.toLowerCase() !== 'map') {
                return false;
            }
            img = $('img[usemap=\'#' + mapName + '\']');
            return img.length > 0 && img.is(':visible');
        }
        if (/^(input|select|textarea|button|object)$/.test(nodeName)) {
            focusableIfVisible = !element.disabled;
            if (focusableIfVisible) {
                fieldset = $(element).closest('fieldset')[0];
                if (fieldset) {
                    focusableIfVisible = !fieldset.disabled;
                }
            }
        } else if ('a' === nodeName) {
            focusableIfVisible = element.href || hasTabindex;
        } else {
            focusableIfVisible = hasTabindex;
        }
        focusableIfVisible = focusableIfVisible || $(element).is('[contenteditable]');
        return focusableIfVisible && $(element).is(':visible');
    };

    var Paste = (function () {
        Paste.prototype._target = null;

        Paste.prototype._container = null;

        Paste.mountNonInputable = function (nonInputable) {
            var paste = new Paste(createHiddenEditable().appendTo(nonInputable), nonInputable);

            $(nonInputable).on('click', (function (_this) {
                return function (ev) {
                    if (!isFocusable(ev.target, false)) {
                        return paste._container.focus();
                    }
                };
            })(this));

            paste._container.on('focus', (function (_this) {
                return function () {
                    return $(nonInputable).addClass('pastable-focus');
                };
            })(this));

            return paste._container.on('blur', (function (_this) {
                return function () {
                    return $(nonInputable).removeClass('pastable-focus');
                };
            })(this));
        };

        Paste.mountTextarea = function (textarea) {
            var ref, ref1;
            if ((typeof DataTransfer !== "undefined" && DataTransfer !== null ? DataTransfer.prototype : void 0) &&
                ((ref = Object.getOwnPropertyDescriptor) != null ?
                    (ref1 = ref.call(Object, DataTransfer.prototype, 'items')) != null ? ref1.get : void 0
                    : void 0)) {
                return this.mountContenteditable(textarea);
            }

            var paste = new Paste(createHiddenEditable().insertBefore(textarea), textarea);
            var ctlDown = false;

            $(textarea).on('keyup', function (ev) {
                var ref2;
                if ((ref2 = ev.keyCode) === 17 || ref2 === 224) {
                    ctlDown = false;
                }
                return null;
            });

            $(textarea).on('keydown', function (ev) {
                var ref2;
                if ((ref2 = ev.keyCode) === 17 || ref2 === 224) {
                    ctlDown = true;
                }
                if ((ev.ctrlKey != null) && (ev.metaKey != null)) {
                    ctlDown = ev.ctrlKey || ev.metaKey;
                }
                if (ctlDown && ev.keyCode === 86) {
                    paste._textarea_focus_stolen = true;
                    paste._container.focus();
                    paste._paste_event_fired = false;
                    setTimeout((function (_this) {
                        return function () {
                            if (!paste._paste_event_fired) {
                                $(textarea).focus();
                                return paste._textarea_focus_stolen = false;
                            }
                        };
                    })(this), 1);
                }
                return null;
            });

            $(textarea).on('paste', (function (_this) {
                return function () { };
            })(this));

            $(textarea).on('focus', (function (_this) {
                return function () {
                    if (!paste._textarea_focus_stolen) {
                        return $(textarea).addClass('pastable-focus');
                    }
                };
            })(this));

            $(textarea).on('blur', (function (_this) {
                return function () {
                    if (!paste._textarea_focus_stolen) {
                        return $(textarea).removeClass('pastable-focus');
                    }
                };
            })(this));

            $(paste._target).on('_pasteCheckContainerDone', (function (_this) {
                return function () {
                    $(textarea).focus();
                    return paste._textarea_focus_stolen = false;
                };
            })(this));

            return $(paste._target).on('pasteText', (function (_this) {
                return function (ev, data) {
                    var curStart = $(textarea).prop('selectionStart');
                    var curEnd = $(textarea).prop('selectionEnd');
                    var content = $(textarea).val();
                    $(textarea).val("" + content.slice(0, curStart) + data.text + content.slice(curEnd));
                    $(textarea)[0].setSelectionRange(curStart + data.text.length, curStart + data.text.length);
                    return $(textarea).trigger('change');
                };
            })(this));
        };

        Paste.mountContenteditable = function (contenteditable) {
            var paste = new Paste(contenteditable, contenteditable);

            $(contenteditable).on('focus', (function (_this) {
                return function () {
                    return $(contenteditable).addClass('pastable-focus');
                };
            })(this));

            return $(contenteditable).on('blur', (function (_this) {
                return function () {
                    return $(contenteditable).removeClass('pastable-focus');
                };
            })(this));
        };

        function Paste(_container, _target) {
            this._container = _container;
            this._target = _target;
            this._container = $(this._container);
            this._target = $(this._target).addClass('pastable');

            this._container.on('paste', (function (_this) {
                return function (ev) {
                    var _i, clipboardData, file, fileType, item, j, k, l, len, len1, len2, pastedFilename, reader, ref, ref1, ref2, ref3, ref4, stringIsFilename, text;

                    _this.originalEvent = (ev.originalEvent !== null ? ev.originalEvent : null);
                    _this._paste_event_fired = true;

                    if (((ref = ev.originalEvent) != null ? ref.clipboardData : undefined) != null) {
                        clipboardData = ev.originalEvent.clipboardData;
                        if (clipboardData.items) {
                            pastedFilename = null;
                            _this.originalEvent.pastedTypes = [];
                            ref2 = clipboardData.items;
                            for (_i = k = 0, len1 = ref2.length; k < len1; _i = ++k) {
                                item = ref2[_i];
                                if (item.type.match(/^image\//)) {
                                    try {
                                        var clipboardImageAsFile = item.getAsFile();
                                        _this._target.trigger('pasteImage', {
                                            file: clipboardImageAsFile,
                                            originalEvent: _this.originalEvent
                                        });
                                    } catch (error) {
                                        console.log('clipboard paste image error', error);
                                    }
                                    ev.preventDefault();
                                    break;
                                }
                            }
                        }
                    }
                    if (window.clipboardData) {
                        ref4 = window.clipboardData.files;
                        for (l = 0, len2 = ref4.length; l < len2; l++) {
                            file = ref4[l];
                            _this._target.trigger('pasteImage', {
                                file: file,
                                originalEvent: _this.originalEvent
                            });
                        }
                    }
                    return null;
                };
            })(this));

        }

        return Paste;

    })();

}).call(this);
