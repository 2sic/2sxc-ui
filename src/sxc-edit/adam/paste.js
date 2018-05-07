/*
paste.js is an interface to read image from clipboard in different browsers. It also contains several hacks.
implementation is based on https://github.com/layerssss/paste.js
*/

(function () {

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
    }

    var Paste = (function () {
        Paste.prototype._target = null;
        Paste.prototype._container = null;

        Paste.mountNonInputable = function (nonInputable) {
            var hiddenEditable = createHiddenEditable();
            nonInputable.appendChild(hiddenEditable);
            var paste = new Paste(hiddenEditable, nonInputable);
            return paste;
        };

        Paste.mountTextarea = function (textarea) {
            var ref, ref1;
            if (((DataTransfer) ? DataTransfer.prototype : undefined) &&
                ((ref = Object.getOwnPropertyDescriptor) ? (ref1 = ref.call(Object, DataTransfer.prototype, 'items')) ? ref1.get : undefined : undefined)) {
                this.mountContenteditable(textarea);
                return;
            }

            var paste = new Paste(createHiddenEditable().insertBefore(textarea), textarea);

            textarea.addEventListener('paste', (function (_this) {
                return function () { };
            })(this));

            return paste;
        };

        Paste.mountContenteditable = function (contenteditable) {
            var paste = new Paste(contenteditable, contenteditable);

            return paste;
        };

        function Paste(_container, _target) {
            this._container = _container;
            this._target = _target;

            this._container.addEventListener('paste', (function (_this) {
                return function (ev) {

                    var _i, clipboardData, file, item, k, l, len1, len2, pastedFilename, ref2, ref4;
                    _this.originalEvent = ev;
                    _this._paste_event_fired = true;
                    if (ev.clipboardData) {
                        clipboardData = ev.clipboardData;
                        if (clipboardData.items) {
                            pastedFilename = null;
                            _this.originalEvent.pastedTypes = [];
                            ref2 = clipboardData.items;
                            for (_i = k = 0, len1 = ref2.length; k < len1; _i = ++k) {
                                item = ref2[_i];
                                if (item.type.match(/^image\//)) {
                                    ev.preventDefault();
                                    ev.stopPropagation();
                                    try {
                                        var clipboardImageAsFile = item.getAsFile();
                                        triggerCustomEvent(
                                            _this._target, 'handleImage', {
                                                file: clipboardImageAsFile,
                                                originalEvent: _this.originalEvent
                                            });
                                    } catch (error) {
                                        console.log('clipboard paste image error', error);
                                        ev.stopImmediatePropagation();
                                    }
                                    break;
                                }
                            }
                        }
                    }
                    // IE code not working
                    //if (window.clipboardData) {
                    //    ref4 = window.clipboardData.files;
                    //    for (l = 0, len2 = ref4.length; l < len2; l++) {
                    //        // ev.stopImmediatePropagation();
                    //        ev.stopPropagation();
                    //        file = ref4[l];
                    //        triggerCustomEvent(
                    //            _this._target, 'handleImage', {
                    //                file: file,
                    //                originalEvent: _this.originalEvent
                    //            });
                    //        ev.preventDefault();
                    //    }
                    //}
                    return;
                };
            })(this));

            function triggerCustomEvent(el, eventName, data) {
                var event;
                if (!/MSIE/.test(navigator.userAgent) && !/rv:11/.test(navigator.userAgent)) {
                    event = new CustomEvent(eventName, { detail: data });
                } else { // fix for IE
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
        if (el._pastable || matches(el, 'textarea, input, [contenteditable]')) {
            return;
        }
        Paste.mountNonInputable(el);
        el._pastable = true;
        return;
    };

    Element.prototype.pastableTextarea = function () {
        var el = this;
        if (el._pastable || matches(el, 'textarea, input') === false) {
            return;
        }
        Paste.mountTextarea(el);
        el._pastable = true;
        return;
    };

    Element.prototype.pastableContenteditable = function () {
        var el = this;
        if (el._pastable || matches(el, '[contenteditable]') === false) {
            return;
        }
        Paste.mountContenteditable(el);
        el._pastable = true;
        return;
    };

}).call(this);
