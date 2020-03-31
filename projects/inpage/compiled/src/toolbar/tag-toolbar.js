"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var render_toolbar_1 = require("./item/render-toolbar");
/**
 * Remove orphan tag-toolbars from DOM
 */
function CleanupTagToolbars() {
    var tagToolbars = $("[" + tagToolbarForAttr + "]");
    tagToolbars.each(function (i, e) {
        var id = $(e).attr(tagToolbarForAttr);
        if (!$("[" + tagToolbarAttr + "=" + id + "]").length) {
            $(e).remove();
        }
    });
}
exports.CleanupTagToolbars = CleanupTagToolbars;
var tagToolbarPadding = 4, tagToolbarPaddingRight = 0, toolbarHeight = 20;
var tagToolbarAttr = 'data-tagtoolbar';
var tagToolbarForAttr = 'data-tagtoolbar-for';
/**
 * Returns the body offset if positioning is relative or absolute
 */
function getBodyOffset() {
    var body = $('body');
    var bodyPos = body.css('position');
    if (bodyPos === 'relative' || bodyPos === 'absolute') {
        var offset = body.offset();
        return {
            top: offset.top,
            left: offset.left
        };
    }
    return {
        top: 0,
        left: 0
    };
}
/**
 * Number generator used for TagToolbars
 */
var lastMenuId = 0;
function getMenuNumber() {
    return lastMenuId++;
}
/** The current mouseposition, always updated when the mouse changes */
var mousePosition = {
    x: 0,
    y: 0
};
/**
 * Keep the mouse-position update for future use
 */
$(window).on('mousemove', function (e) {
    mousePosition.x = e.clientX;
    mousePosition.y = e.clientY;
});
var TagToolbar = /** @class */ (function () {
    function TagToolbar(tag, cnt) {
        var _this = this;
        this.tag = tag;
        this.cnt = cnt;
        this.toolbarElement = null;
        this.initialized = false;
        this.updatePosition = this.updatePosition.bind(this);
        // Ensure toolbar gets visible when hovering
        tag.on('mouseenter', function () {
            _this.initialize();
            _this.showToolbar();
        });
        tag.on('mouseleave', function (e) {
            _this.initialize();
            // if we hover the menu itself now, don't hide it
            if (!$.contains(_this.toolbarElement[0], e.relatedTarget) && _this.toolbarElement[0] !== e.relatedTarget)
                _this.hideToolbar();
        });
    }
    TagToolbar.prototype.initialize = function () {
        var _this = this;
        if (this.initialized)
            return;
        var toolbarId = this.cnt.instance.id + "-" + this.cnt.contentBlock.id + "-" + getMenuNumber();
        // render toolbar and append tag to body
        this.toolbarElement = $(render_toolbar_1.renderToolbar(this.cnt));
        this.toolbarElement.on('mouseleave', function (e) {
            // if we do not hover the tag now, hide it
            if (!$.contains(_this.tag[0], e.relatedTarget) && _this.tag[0] !== e.relatedTarget)
                _this.hideToolbar();
        });
        $('body').append(this.toolbarElement);
        this.toolbarElement.attr(tagToolbarForAttr, toolbarId);
        this.tag.attr(tagToolbarAttr, toolbarId);
        this.toolbarElement.css({ display: 'none', position: 'absolute', transition: 'top 0.5s ease-out' });
        this.initialized = true;
    };
    TagToolbar.prototype.updatePosition = function () {
        var position = {
            top: 'auto',
            left: 'auto',
            right: 'auto',
            viewportOffset: this.tag[0].getBoundingClientRect().top,
            bodyOffset: getBodyOffset(),
            tagScrollOffset: 0,
            tagOffset: this.tag.offset(),
            tagWidth: this.tag.outerWidth(),
            mousePos: mousePosition,
            win: {
                scrollY: window.scrollY,
                width: $('body').width()
            },
            padding: tagToolbarPadding
        };
        // If we scrolled down, the toolbar might not be visible - calculate offset
        position.tagScrollOffset = Math.min(position.viewportOffset - position.bodyOffset.top, 0);
        // Update top coordinates
        if (position.tagScrollOffset === 0)
            position.top = position.tagOffset.top + tagToolbarPadding - position.bodyOffset.top;
        else
            position.top = position.mousePos.y + position.win.scrollY - position.bodyOffset.top - toolbarHeight / 2;
        // Update left / right coordinates
        // todo: try to change class to use attribute or something
        if (this.toolbarElement.hasClass('sc-tb-hover-right'))
            position.right = position.win.width - position.tagOffset.left - position.tagWidth + tagToolbarPaddingRight - position.bodyOffset.left;
        else
            position.left = position.tagOffset.left + tagToolbarPadding + position.bodyOffset.left;
        var cssPos = {
            top: position.top,
            left: position.left,
            right: position.right
        };
        this.toolbarElement.css(cssPos);
    };
    TagToolbar.prototype.hideToolbar = function () {
        $(window).off('scroll', this.updatePosition);
        this.toolbarElement.css({ display: 'none' });
    };
    TagToolbar.prototype.showToolbar = function () {
        /*if (this.toolbarElement.is(':visible'))
          return;*/
        this.toolbarElement.css({ display: 'block' });
        $(window).on('scroll', this.updatePosition);
        this.updatePosition();
    };
    return TagToolbar;
}());
exports.TagToolbar = TagToolbar;
//# sourceMappingURL=tag-toolbar.js.map