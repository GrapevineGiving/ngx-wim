import { Injectable, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import * as i0 from "@angular/core";
import * as i1 from "@angular/platform-browser";
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
    /** @nocollapse */ WimService.ngInjectableDef = i0.ɵɵdefineInjectable({ token: WimService, factory: function WimService_Factory(t) { return new (t || WimService)(i0.ɵɵinject(i1.DomSanitizer)); }, providedIn: 'root' });
    return WimService;
}());
export { WimService };
/*@__PURE__*/ i0.ɵsetClassMetadata(WimService, [{
        type: Injectable,
        args: [{
                providedIn: 'root',
            }]
    }], function () { return [{ type: i1.DomSanitizer }]; }, null);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2ltLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtd2ltLyIsInNvdXJjZXMiOlsibGliL3dpbS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsZUFBZSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzVELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQzs7O0FBT3pELG1FQUFtRTtBQUNuRSxJQUFNLHdCQUF3QixHQUFHLFlBQVksQ0FBQztBQUM5QyxnR0FBZ0c7QUFDaEcsNEJBQTRCO0FBQzVCLG1HQUFtRztBQUNuRyxxRUFBcUU7QUFDckUsSUFBTSxxQkFBcUIsR0FBRyw0RUFBNEUsQ0FBQztBQUMzRyxJQUFNLHNCQUFzQixHQUFHLHdGQUF3RixDQUFDO0FBQ3hILG1HQUFtRztBQUNuRyxpQkFBaUI7QUFDakIsSUFBTSxvQkFBb0IsR0FBRyxVQUFBLENBQUM7SUFDNUIsaUJBQWlCO0lBQ2pCLE9BQUEsT0FBSyxDQUFHO1FBQ1IsdUNBQXVDO1FBQ3ZDLEdBQUc7O1FBQ0gsMkNBQTJDO1FBQzNDLFVBQVEsQ0FBQyxNQUFHLENBQUE7O1FBQ1osaUVBQWlFO1FBQ2pFLHlCQUF1QixDQUFDLE9BQUksQ0FBQTs7UUFDNUIseUNBQXlDO1FBQ3pDLFVBQVEsQ0FBQyxRQUFLLENBQUE7UUFDZCxHQUFHOztRQUNILGtCQUFrQjtRQUNsQixPQUFLLENBQUcsQ0FBQTtBQVhSLENBV1EsQ0FBQztBQUVYLHFEQUFxRDtBQUNyRCxvQ0FBb0M7QUFDcEMsOEJBQThCO0FBQzlCLG1DQUFtQztBQUNuQyxJQUFNLHNCQUFzQixHQUFHLFVBQUEsQ0FBQztJQUM5QixPQUFBLElBQUksTUFBTSxDQUNSLEdBQUc7UUFDRCx3QkFBd0IsQ0FBQyxNQUFNO1FBQy9CLHFCQUFxQixDQUFDLE1BQU07UUFDNUIsR0FBRztRQUNILG9CQUFvQixDQUFDLENBQUMsQ0FBQztRQUN2QixHQUFHO1FBQ0gsc0JBQXNC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QUFVLDZEQUFWLFVBQVUsZ0RBRlQsTUFBTTtxQkFuRnBCO0NBNkhDLEFBM0NELElBMkNDO1NBeENZLFVBQVU7bUNBQVYsVUFBVTtjQUh0QixVQUFVO2VBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBTZWN1cml0eUNvbnRleHQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERvbVNhbml0aXplciB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuXG5leHBvcnQgdHlwZSBXaW1PcHRpb25zID0ge1xuICBub0VzY2FwZT86IGJvb2xlYW47XG4gIG5vU2FuaXRpemU/OiBib29sZWFuO1xufTtcblxuLy8gRGVsaW1pdGVycyBtdXN0IGJlIGhhdmUgd2hpdGVzcGFjZSBvciBsaW5lLWJvdW5kYXJ5IGFyb3VuZCB0aGVtLlxuY29uc3QgV0hJVEVTUEFDRV9PUl9MSU5FX0JSRUFLID0gLyg/Ol58XFxzfCQpLztcbi8vIENvbW1vbiBzdXJyb3VuZGluZyBjaGFyYWN0ZXJzIGNhbiBzaXQgYmV0d2VlbiB0aGUgd2hpdGVzcGFjZS9saW5lLWJvdW5kYXJ5IGFuZCB0aGUgZGVsaW1pdGVyLFxuLy8gbGlrZSBxdW90ZXMsIHBhcmVucywgZXRjLlxuLy8gTk9URTogU2luY2UgSFRNTCBlc2NhcGluZyBtYXkgaGF2ZSBiZWVuIHBlcmZvcm1lZCwgbmVlZCB0byBtYXRjaCBib3RoIGxpdGVyYWwgYW5kIGVzY2FwZWQgY2hhcnMuXG4vLyBUT0RPOiBfKm5lc3RlZCpfIGRlbGltaXRlciBzdXBwb3J0IGlzIGhhY2t5LiBCb2xzdGVyIGxvZ2ljIGZvciBpdC5cbmNvbnN0IEFMTE9XRURfTEVGVF9TVVJST1VORCA9IC8oPzpcXCh8J3wmIzAzOTt8XCJ8JnF1b3Q7fCYjMzQ7fOKAmHwmIzgyMTY7fOKAnHwmIzgyMjA7fF98PGVtPnxcXCp8PHN0cm9uZz4pezAsM30vO1xuY29uc3QgQUxMT1dFRF9SSUdIVF9TVVJST1VORCA9IC8oPzpcXCl8J3wmIzAzOTt8XCJ8JnF1b3Q7fCYjMzQ7fOKAmXwmIzgyMTc7fOKAnXwmIzgyMjE7fF98PFxcL2VtPnxcXCp8PFxcL3N0cm9uZz58WywuPyE6XSl7MCwzfS87XG4vLyBSZXR1cm5zIGEgcmVnZXggbWF0Y2hpbmcgdGhlIGRlbGltaXRlcnMgYW5kIHRoZSB0ZXh0IHRoZXkgd3JhcC4gVGhlIHdyYXBwZWQgdGV4dCBtYXkgbm90IGluY2x1ZGVcbi8vIHRoZSBkZWxpbWl0ZXIuXG5jb25zdCBXUkFQUEVEX0lOTElORV9NQVRDSCA9IGQgPT5cbiAgLy8gT3BlbiBkZWxpbWl0ZXJcbiAgYFxcXFwke2R9YCArXG4gIC8vIENhcHR1cmUgdGhlIHRleHQgYmV0d2VlbiBkZWxpbWl0ZXJzLlxuICBgKGAgK1xuICAvLyBUZXh0IGJldHdlZW4gc3RhcnRzIHdpdGggbm9uLXdoaXRlc3BhY2UuXG4gIGBbXlxcXFxzJHtkfV1gICtcbiAgLy8gVGV4dCBiZXR3ZWVuIG11c3Qgbm90IGNvbnRhaW4gbGluZS1icmVha3Mgb3IgbGFyZ2Utd2hpdGVzcGFjZS5cbiAgYCg/OlteXFxcXHJcXFxcblxcXFx0XFxcXGZcXFxcdiR7ZH1dKmAgK1xuICAvLyBUZXh0IGJldHdlZW4gZW5kcyB3aXRoIG5vbi13aGl0ZXNwYWNlLlxuICBgW15cXFxccyR7ZH1dKT9gICtcbiAgYClgICtcbiAgLy8gQ2xvc2UgZGVsaW1pdGVyXG4gIGBcXFxcJHtkfWA7XG5cbi8vIEEgZnVsbCByZWdleCB0byBtYXRjaCBhIGRlbGltaXRlci4gQ2FwdHVyZSBncm91cHM6XG4vLyAwOiBUZXh0IGJlZm9yZSBvcGVuaW5nIGRlbGltaXRlci5cbi8vIDE6IFRleHQgYmV0d2VlbiBkZWxpbWl0ZXJzLlxuLy8gMjogVGV4dCBhZnRlciBjbG9zaW5nIGRlbGltaXRlci5cbmNvbnN0IElOTElORV9ERUxJTUlURVJfUkVHRVggPSBkID0+XG4gIG5ldyBSZWdFeHAoXG4gICAgJygnICtcbiAgICAgIFdISVRFU1BBQ0VfT1JfTElORV9CUkVBSy5zb3VyY2UgK1xuICAgICAgQUxMT1dFRF9MRUZUX1NVUlJPVU5ELnNvdXJjZSArXG4gICAgICAnKScgK1xuICAgICAgV1JBUFBFRF9JTkxJTkVfTUFUQ0goZCkgK1xuICAgICAgJygnICtcbiAgICAgIEFMTE9XRURfUklHSFRfU1VSUk9VTkQuc291cmNlICtcbiAgICAgIFdISVRFU1BBQ0VfT1JfTElORV9CUkVBSy5zb3VyY2UgK1xuICAgICAgJyknLFxuICAgICdnbSdcbiAgKTtcblxuY29uc3QgU1RST05HX1JFR0VYID0gSU5MSU5FX0RFTElNSVRFUl9SRUdFWCgnKicpO1xuY29uc3QgRU1fUkVHRVggPSBJTkxJTkVfREVMSU1JVEVSX1JFR0VYKCdfJyk7XG5cbi8vIFRoZXJlIGlzIG5vIGdlbmVyYWwgcmVnZXggdGhhdCBjYW4gY2FwdHVyZSBVUkxzLWluLXRleHQgcGVyZmVjdGx5LiBUaGlzIGlzIG91ciBnb29kLWVub3VnaFxuLy8gYXBwcm94aW1hdGlvbi5cbi8vIFRPRE86IEFsbG93IFVSTCBwcmVjZWVkZWQvZm9sbG93ZWQgYnkgcGFyZW50aGVzaXMsIHF1b3RlcywgZXRjLlxuLy8gVE9ETzogQWxsb3cgSUROL1VuaWNvZGUgZG9tYWlucy5cbmNvbnN0IFVSTF9SRUdFWF9QQVRIX0ZJTkFMX0NIQVJTID0gJ2EtejAtOVxcXFwvXFxcXC0rJkAjJT1+X3wkJztcbmNvbnN0IFVSTF9SRUdFWF9GT0xMT1dJTkdfQ0hBUlMgPSAnPyE6LC4nO1xuY29uc3QgVVJMX1JFR0VYX1BBVEhfQ0hBUlMgPSBVUkxfUkVHRVhfUEFUSF9GSU5BTF9DSEFSUyArIFVSTF9SRUdFWF9GT0xMT1dJTkdfQ0hBUlM7XG5jb25zdCBVUkxfUkVHRVggPSBuZXcgUmVnRXhwKFxuICAvLyBDYXB0dXJlIGdyb3VwICQxOiBVUkwgaXMgcHJlY2VlZGVkIGJ5IGxpbmUtYm91bmRhcnkgb3Igd2hpdGVzcGFjZS5cbiAgJyhefFxcXFxzKScgK1xuICAgIC8vIENhcHR1cmUgZ3JvdXAgJDI6IHRoZSBVUkwuXG4gICAgJygnICtcbiAgICAvLyBPcHRpb25hbCBwcm90b2NvbHMgaHR0cDovLywgaHR0cHM6Ly8sIGFuZCBmdHA6Ly9cbiAgICAnKD86aHR0cHM/Oi8vfGZ0cDovLyk/JyArXG4gICAgLy8gRG9tYWluIHBsdXMgYW55IHN1YmRvbWFpbnNcbiAgICAnKD86W2EtejAtOVxcXFwtXXsxLDYzfVxcXFwuKSsnICtcbiAgICAvLyBUTERcbiAgICAnW2Etel17MSw2M30nICtcbiAgICAvLyBPcHRpb25hbCBwYXRoLiBUaGUgZmluYWwgY2hhcmFjdGVyJ3Mgc2V0IGlzIGxpbWl0ZWQgdG8gcHJldmVudCBzb21lIGVuZGluZyBwdW5jdHVhdGlvbi5cbiAgICAvLyBFLmcuLCB0aGUgZmluYWwgcGVyaW9kIG9mIFwiZm9vLmNvbS9iYXIuYmF6LlwiIHNob3VsZG4ndCBiZSBpbmNsdWRlZCBpbiB0aGUgVVJMLlxuICAgIGAoPzpbJHtVUkxfUkVHRVhfUEFUSF9DSEFSU31dKlske1VSTF9SRUdFWF9QQVRIX0ZJTkFMX0NIQVJTfV0pP2AgK1xuICAgIC8vIEVuZCBvZiBVUkwgY2FwdHVyZSBncm91cC5cbiAgICAnKScgK1xuICAgIC8vIENhcHR1cmUgZ3JvdXAgJDM6IFVSTCBpcyBmb2xsb3dlZCBieSBsaW5lLWJvdW5kYXJ5LCB3aGl0ZXNwYWNlLCBvciBcImZvbGxvd2luZyBjaGFyLlwiXG4gICAgYCgkfFxcXFxzfFske1VSTF9SRUdFWF9GT0xMT1dJTkdfQ0hBUlN9XSlgLFxuICAnZ2knXG4pO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgV2ltU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZG9tU2FuaXRpemVyOiBEb21TYW5pdGl6ZXIpIHt9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgZXNjYXBlSHRtbChtZXNzYWdlOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIC8vIE5PVEU6IFdlaXJkIGJ1ZyB3b3JrYXJvdW5kLiBBbmd1bGFyIGNvbXBsYWlucyBgRXhwcmVzc2lvbiBmb3JtIG5vdCBzdXBwb3J0ZWRgIHdpdGggc29tZVxuICAgIC8vIHN0YXRpYyBtZXRob2RzLiBFaXRoZXIgc3RvcmluZyB0aGUgcGFyYW0gYXMgYSBjb25zdCBiZWZvcmUgdXNpbmcgaXQgb3IgYWRkaW5nIGAvLyBAZHluYW1pY2BcbiAgICAvLyB0byB0aGUgY2xhc3MgYXZvaWRzIGl0LlxuICAgIGNvbnN0IG1zZyA9IG1lc3NhZ2U7XG4gICAgcmV0dXJuIG1zZ1xuICAgICAgLnJlcGxhY2UoLzwvZywgJyZsdDsnKVxuICAgICAgLnJlcGxhY2UoLz4vZywgJyZndDsnKVxuICAgICAgLnJlcGxhY2UoL1wiL2csICcmcXVvdDsnKVxuICAgICAgLnJlcGxhY2UoLycvZywgJyYjMDM5OycpO1xuICB9XG5cbiAgdG9IdG1sKG1lc3NhZ2U6IHN0cmluZywgb3B0aW9uczogV2ltT3B0aW9ucyA9IHt9KTogc3RyaW5nIHtcbiAgICBpZiAoIW9wdGlvbnMubm9Fc2NhcGUpIHtcbiAgICAgIG1lc3NhZ2UgPSBXaW1TZXJ2aWNlLmVzY2FwZUh0bWwobWVzc2FnZSk7XG4gICAgfVxuXG4gICAgLy8gTGlua3MhXG4gICAgLy8gVE9ETzogUHJldmVudCBlc2NhcGluZyBsaW5rIGNoYXJzIGxpa2UgJi5cbiAgICBtZXNzYWdlID0gbWVzc2FnZS5yZXBsYWNlKFVSTF9SRUdFWCwgKHgsIHByZWNlZWRpbmcsIHVybCwgZm9sbG93aW5nKSA9PiB7XG4gICAgICAvLyBJZiB0aGUgVVJMIGRvZXNuJ3QgaGF2ZSBhIHByb3RvY29sLCBwcmVwZW5kIHRoZSByZWxhdGl2ZSBwcm90b2NvbCwgJy8vJy5cbiAgICAgIGNvbnN0IGhyZWYgPSB1cmwubWF0Y2goL14oKGh0dHB8aHR0cHN8ZnRwKTpcXC9cXC8pL2kpID8gdXJsIDogJy8vJyArIHVybDtcbiAgICAgIHJldHVybiBgJHtwcmVjZWVkaW5nfTxhIHRhcmdldD1cIl9ibGFua1wiIGhyZWY9XCIke2hyZWZ9XCI+JHt1cmx9PC9hPiR7Zm9sbG93aW5nfWA7XG4gICAgfSk7XG5cbiAgICAvLyBJbmxpbmUgZGVsaW1pdGVycyBsaWtlICpib2xkKiBhbmQgX2l0YWxpY18uXG4gICAgbWVzc2FnZSA9IG1lc3NhZ2UucmVwbGFjZShTVFJPTkdfUkVHRVgsICckMTxzdHJvbmc+JDI8L3N0cm9uZz4kMycpO1xuICAgIG1lc3NhZ2UgPSBtZXNzYWdlLnJlcGxhY2UoRU1fUkVHRVgsICckMTxlbT4kMjwvZW0+JDMnKTtcblxuICAgIC8vIEJyZWFrc1xuICAgIG1lc3NhZ2UgPSBtZXNzYWdlLnJlcGxhY2UoL1xcbi9nLCAnPGJyPicpO1xuXG4gICAgaWYgKCFvcHRpb25zLm5vU2FuaXRpemUpIHtcbiAgICAgIG1lc3NhZ2UgPSB0aGlzLmRvbVNhbml0aXplci5zYW5pdGl6ZShTZWN1cml0eUNvbnRleHQuSFRNTCwgbWVzc2FnZSk7XG4gICAgfVxuICAgIHJldHVybiBtZXNzYWdlO1xuICB9XG59XG4iXX0=