import { SecurityContext, ɵɵdefineInjectable, ɵɵinject, ɵsetClassMetadata, Injectable, ɵɵdefineDirective, ɵɵdirectiveInject, ElementRef, Renderer2, ɵɵNgOnChangesFeature, Directive, Input, ɵɵdefineNgModule, ɵɵdefineInjector, ɵɵsetNgModuleScope, NgModule } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

// Delimiters must be have whitespace or line-boundary around them.
var WHITESPACE_OR_LINE_BREAK = /(?:^|\s|$)/;
// Common surrounding characters can sit between the whitespace/line-boundary and the delimiter,
// like quotes, parens, etc.
// NOTE: Since HTML escaping may have been performed, need to match both literal and escaped chars.
// TODO: _*nested*_ delimiter support is hacky. Bolster logic for it.
var ALLOWED_LEFT_SURROUND = /(?:\(|'|&#039;|"|&quot;|&#34;|‘|&#8216;|“|&#8220;|_|<em>|\*|<strong>){0,3}/;
var ALLOWED_RIGHT_SURROUND = /(?:\)|'|&#039;|"|&quot;|&#34;|’|&#8217;|”|&#8221;|_|<\/em>|\*|<\/strong>|[,.?!:]){0,3}/;
// Returns a regex matching the delimiters and the text they wrap. The wrapped text may not include
// the delimiter.
var WRAPPED_INLINE_MATCH = function (d) {
    // Open delimiter
    return "\\" + d +
        // Capture the text between delimiters.
        "(" +
        (
        // Text between starts with non-whitespace.
        "[^\\s" + d + "]") +
        (
        // Text between must not contain line-breaks or large-whitespace.
        "(?:[^\\r\\n\\t\\f\\v" + d + "]*") +
        (
        // Text between ends with non-whitespace.
        "[^\\s" + d + "])?") +
        ")" +
        (
        // Close delimiter
        "\\" + d);
};
// A full regex to match a delimiter. Capture groups:
// 0: Text before opening delimiter.
// 1: Text between delimiters.
// 2: Text after closing delimiter.
var INLINE_DELIMITER_REGEX = function (d) {
    return new RegExp('(' +
        WHITESPACE_OR_LINE_BREAK.source +
        ALLOWED_LEFT_SURROUND.source +
        ')' +
        WRAPPED_INLINE_MATCH(d) +
        '(' +
        ALLOWED_RIGHT_SURROUND.source +
        WHITESPACE_OR_LINE_BREAK.source +
        ')', 'gm');
};
var STRONG_REGEX = INLINE_DELIMITER_REGEX('*');
var EM_REGEX = INLINE_DELIMITER_REGEX('_');
// There is no general regex that can capture URLs-in-text perfectly. This is our good-enough
// approximation.
// TODO: Allow URL preceeded/followed by parenthesis, quotes, etc.
// TODO: Allow IDN/Unicode domains.
var URL_REGEX_PATH_FINAL_CHARS = 'a-z0-9\\/\\-+&@#%=~_|$';
var URL_REGEX_FOLLOWING_CHARS = '?!:,.';
var URL_REGEX_PATH_CHARS = URL_REGEX_PATH_FINAL_CHARS + URL_REGEX_FOLLOWING_CHARS;
var URL_REGEX = new RegExp(
// Capture group $1: URL is preceeded by line-boundary or whitespace.
'(^|\\s)' +
    // Capture group $2: the URL.
    '(' +
    // Optional protocols http://, https://, and ftp://
    '(?:https?://|ftp://)?' +
    // Domain plus any subdomains
    '(?:[a-z0-9\\-]{1,63}\\.)+' +
    // TLD
    '[a-z]{1,63}' +
    (
    // Optional path. The final character's set is limited to prevent some ending punctuation.
    // E.g., the final period of "foo.com/bar.baz." shouldn't be included in the URL.
    "(?:[" + URL_REGEX_PATH_CHARS + "]*[" + URL_REGEX_PATH_FINAL_CHARS + "])?") +
    // End of URL capture group.
    ')' +
    (
    // Capture group $3: URL is followed by line-boundary, whitespace, or "following char."
    "($|\\s|[" + URL_REGEX_FOLLOWING_CHARS + "])"), 'gi');
var WimService = /** @class */ (function () {
    function WimService(domSanitizer) {
        this.domSanitizer = domSanitizer;
    }
    WimService.escapeHtml = function (message) {
        // NOTE: Weird bug workaround. Angular complains `Expression form not supported` with some
        // static methods. Either storing the param as a const before using it or adding `// @dynamic`
        // to the class avoids it.
        var msg = message;
        return msg
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    };
    WimService.prototype.toHtml = function (message, options) {
        if (options === void 0) { options = {}; }
        if (!options.noEscape) {
            message = WimService.escapeHtml(message);
        }
        // Links!
        // TODO: Prevent escaping link chars like &.
        message = message.replace(URL_REGEX, function (x, preceeding, url, following) {
            // If the URL doesn't have a protocol, prepend the relative protocol, '//'.
            var href = url.match(/^((http|https|ftp):\/\/)/i) ? url : '//' + url;
            return preceeding + "<a target=\"_blank\" href=\"" + href + "\">" + url + "</a>" + following;
        });
        // Inline delimiters like *bold* and _italic_.
        message = message.replace(STRONG_REGEX, '$1<strong>$2</strong>$3');
        message = message.replace(EM_REGEX, '$1<em>$2</em>$3');
        // Breaks
        message = message.replace(/\n/g, '<br>');
        if (!options.noSanitize) {
            message = this.domSanitizer.sanitize(SecurityContext.HTML, message);
        }
        return message;
    };
    /** @nocollapse */ WimService.ngInjectableDef = ɵɵdefineInjectable({ token: WimService, factory: function WimService_Factory(t) { return new (t || WimService)(ɵɵinject(DomSanitizer)); }, providedIn: 'root' });
    return WimService;
}());
/*@__PURE__*/ ɵsetClassMetadata(WimService, [{
        type: Injectable,
        args: [{
                providedIn: 'root',
            }]
    }], function () { return [{ type: DomSanitizer }]; }, null);

var WimDirective = /** @class */ (function () {
    function WimDirective(elementRef, renderer2, wimService) {
        this.elementRef = elementRef;
        this.renderer2 = renderer2;
        this.wimService = wimService;
    }
    WimDirective.prototype.ngOnChanges = function () {
        var html = this.wimService.toHtml(this.wim || '');
        this.renderer2.setProperty(this.elementRef.nativeElement, 'innerHTML', html);
    };
    /** @nocollapse */ WimDirective.ngDirectiveDef = ɵɵdefineDirective({ type: WimDirective, selectors: [["", "wim", ""]], factory: function WimDirective_Factory(t) { return new (t || WimDirective)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(Renderer2), ɵɵdirectiveInject(WimService)); }, inputs: { wim: "wim" }, features: [ɵɵNgOnChangesFeature()] });
    return WimDirective;
}());
/*@__PURE__*/ ɵsetClassMetadata(WimDirective, [{
        type: Directive,
        args: [{
                selector: '[wim]',
            }]
    }], function () { return [{ type: ElementRef }, { type: Renderer2 }, { type: WimService }]; }, { wim: [{
            type: Input,
            args: ['wim']
        }] });

var WimModule = /** @class */ (function () {
    function WimModule() {
    }
    /** @nocollapse */ WimModule.ngModuleDef = ɵɵdefineNgModule({ type: WimModule });
    /** @nocollapse */ WimModule.ngInjectorDef = ɵɵdefineInjector({ factory: function WimModule_Factory(t) { return new (t || WimModule)(); }, providers: [WimService], imports: [[]] });
    return WimModule;
}());
/*@__PURE__*/ ɵɵsetNgModuleScope(WimModule, { declarations: [WimDirective], exports: [WimDirective] });
/*@__PURE__*/ ɵsetClassMetadata(WimModule, [{
        type: NgModule,
        args: [{
                declarations: [WimDirective],
                imports: [],
                exports: [WimDirective],
                providers: [WimService],
            }]
    }], null, null);

/*
 * Public API Surface of ngx-wim
 */

/**
 * Generated bundle index. Do not edit.
 */

export { WimDirective, WimModule, WimService };
//# sourceMappingURL=ngx-wim.js.map
