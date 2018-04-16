/*
paste.js is an interface to read image from clipboard in different browsers. It also contains several hacks.
implementation is based on https://github.com/layerssss/paste.js
*/

(function () {
    var $ = window.jQuery;

    var matches = function (el, selector) {
        return (el.matches || el.matchesSelector || el.msMatchesSelector || el.mozMatchesSelector || el.webkitMatchesSelector || el.oMatchesSelector).call(el, selector);
    };

    function createHiddenEditable() {
        var hiddenEditable = document.createElement('div');
        hiddenEditable.setAttribute('contenteditable', true);
        hiddenEditable.setAttribute('aria-hidden', true);
        hiddenEditable.setAttribute('tabindex', -1);
        hiddenEditable.style.width = 1;
        hiddenEditable.style.height = 1;
        hiddenEditable.style.position = 'fixed';
        hiddenEditable.style.left = -100;
        hiddenEditable.style.overflow = 'hidden';
        hiddenEditable.style.opacity = 1e-17;
        return hiddenEditable;
    };

    var isFocusable = function (element, hasTabindex) {
        var fieldset;
        var focusableIfVisible;
        var nodeName = element.nodeName.toLowerCase();

        if (/^(input|select|textarea|button|object)$/.test(nodeName)) {
            focusableIfVisible = !element.disabled;
            if (focusableIfVisible) {
                fieldset = element.closest('fieldset');
                if (fieldset) {
                    focusableIfVisible = !fieldset.disabled;
                }
            }
        } else if ('a' === nodeName) {
            focusableIfVisible = element.href || hasTabindex;
        } else {
            focusableIfVisible = hasTabindex;
        }
        focusableIfVisible = focusableIfVisible || matches(element, '[contenteditable]');
        return focusableIfVisible;
    };

    var Paste = (function () {
        Paste.prototype._target = null;

        Paste.prototype._container = null;

        Paste.mountNonInputable = function (nonInputable) {
            var hiddenEditable = createHiddenEditable();
            nonInputable.appendChild(hiddenEditable);
            var paste = new Paste(hiddenEditable, nonInputable);

            $(nonInputable).on('click', (function (_this) {
                return function (ev) {
                    if (!isFocusable(ev.target, false)) {
                        paste._container.focus();
                        return;
                    }
                };
            })(this));

            paste._container.on('focus', (function (_this) {
                return function () {
                    $(nonInputable).addClass('pastable-focus');
                    return;
                };
            })(this));

            return paste._container.on('blur', (function (_this) {
                return function () {
                    $(nonInputable).removeClass('pastable-focus');
                    return;
                };
            })(this));
        };

        Paste.mountTextarea = function (textarea) {
            var ref, ref1;
            if ((typeof DataTransfer !== "undefined" && DataTransfer !== null ? DataTransfer.prototype : undefined) &&
                ((ref = Object.getOwnPropertyDescriptor) != null ? (ref1 = ref.call(Object, DataTransfer.prototype, 'items')) != null ? ref1.get : undefined : undefined)) {
                this.mountContenteditable(textarea);
                return;
            }

            var paste = new Paste(createHiddenEditable().insertBefore(textarea), textarea);
            var ctlDown = false;

            $(textarea).on('keyup', function (ev) {
                var ref2;
                if ((ref2 = ev.keyCode) === 17 || ref2 === 224) {
                    ctlDown = false;
                }
                return;
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
                                paste._textarea_focus_stolen = false;
                                return;
                            }
                        };
                    })(this), 1);
                }
                return;
            });

            $(textarea).on('paste', (function (_this) {
                return function () { };
            })(this));

            $(textarea).on('focus', (function (_this) {
                return function () {
                    if (!paste._textarea_focus_stolen) {
                        $(textarea).addClass('pastable-focus');
                        return;
                    }
                };
            })(this));

            $(textarea).on('blur', (function (_this) {
                return function () {
                    if (!paste._textarea_focus_stolen) {
                        $(textarea).removeClass('pastable-focus');
                        return;
                    }
                };
            })(this));

            $(paste._target).on('_pasteCheckContainerDone', (function (_this) {
                return function () {
                    $(textarea).focus();
                    paste._textarea_focus_stolen = false;
                    return;
                };
            })(this));

            $(paste._target).on('pasteText', (function (_this) {
                return function (ev, data) {
                    var curStart = $(textarea).prop('selectionStart');
                    var curEnd = $(textarea).prop('selectionEnd');
                    var content = $(textarea).val();
                    $(textarea).val("" + content.slice(0, curStart) + data.text + content.slice(curEnd));
                    $(textarea)[0].setSelectionRange(curStart + data.text.length, curStart + data.text.length);
                    $(textarea).trigger('change');
                    return;
                };
            })(this));
        };

        Paste.mountContenteditable = function (contenteditable) {
            var paste = new Paste(contenteditable, contenteditable);

            $(contenteditable).on('focus', (function (_this) {
                return function () {
                    $(contenteditable).addClass('pastable-focus');
                    return;
                };
            })(this));

            $(contenteditable).on('blur', (function (_this) {
                return function () {
                    $(contenteditable).removeClass('pastable-focus');
                    return;
                };
            })(this));

            return;
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
                                        triggerCustomEvent(
                                            _this._target[0], 'pasteImage', {
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
                            triggerCustomEvent(
                                _this._target[0], 'pasteImage', {
                                    file: file,
                                    originalEvent: _this.originalEvent
                                });
                        }
                    }
                    return;
                };
            })(this));

            function triggerCustomEvent(el, eventName, data) {
                var event;
                if (window.CustomEvent) {
                    event = new CustomEvent(eventName, { detail: data });
                } else {
                    event = document.createEvent('CustomEvent');
                    event.initCustomEvent(eventName, true, true, data);
                }

                el.dispatchEvent(event);
            }

        }

        return Paste;

    })();

    Element.prototype.paste = function (pasteContainer) {
        var pm = Paste.mountNonInputable(pasteContainer);
        return pm._container;
    };

    Element.prototype.pastableNonInputable = function () {
        var el = this;
        if (el._pastable || $(el).is('textarea, input:text, [contenteditable]')) {
            return;
        }
        Paste.mountNonInputable(el);
        el._pastable = true;
        return;
    };

    Element.prototype.pastableTextarea = function () {
        var el = this;
        if (el._pastable || $(el).is(':not(textarea, input:text)')) {
            return;
        }
        Paste.mountTextarea(el);
        el._pastable = true;
        return;
    };

    Element.prototype.pastableContenteditable = function () {
        var el = this;
        if (el._pastable || $(el).is(':not([contenteditable])')) {
            return;
        }
        Paste.mountContenteditable(el);
        el._pastable = true;
        return;
    };

}).call(this);
