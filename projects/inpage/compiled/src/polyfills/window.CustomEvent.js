// Polyfill for creating CustomEvents on IE9/10/11
// https://raw.githubusercontent.com/krambuhl/custom-event-polyfill/master/custom-event-polyfill.js
try {
    var ce = new window.CustomEvent('test');
    ce.preventDefault();
    if (ce.defaultPrevented !== true) {
        // IE has problems with .preventDefault() on custom events
        // http://stackoverflow.com/questions/23349191
        throw new Error('Could not prevent default');
    }
}
catch (e) {
    var CustomEvent_1 = function (event, params) {
        params = params || {
            bubbles: false,
            cancelable: false,
            detail: undefined
        };
        var evt = document.createEvent('CustomEvent');
        evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
        var origPrevent = evt.preventDefault;
        evt.preventDefault = function () {
            origPrevent.call(this);
            try {
                Object.defineProperty(this, 'defaultPrevented', {
                    get: function () { return true; }
                });
            }
            catch (e) {
                this.defaultPrevented = true;
            }
        };
        return evt;
    };
    CustomEvent_1.prototype = window.Event.prototype;
    window.CustomEvent = CustomEvent_1; // expose definition to window
}
//# sourceMappingURL=window.CustomEvent.js.map