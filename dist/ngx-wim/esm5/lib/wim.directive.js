import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { WimService } from './wim.service';
import * as i0 from "@angular/core";
import * as i1 from "./wim.service";
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
    /** @nocollapse */ WimDirective.ngDirectiveDef = i0.ɵɵdefineDirective({ type: WimDirective, selectors: [["", "wim", ""]], factory: function WimDirective_Factory(t) { return new (t || WimDirective)(i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i0.Renderer2), i0.ɵɵdirectiveInject(i1.WimService)); }, inputs: { wim: "wim" }, features: [i0.ɵɵNgOnChangesFeature()] });
    return WimDirective;
}());
export { WimDirective };
/*@__PURE__*/ i0.ɵsetClassMetadata(WimDirective, [{
        type: Directive,
        args: [{
                selector: '[wim]',
            }]
    }], function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i1.WimService }]; }, { wim: [{
            type: Input,
            args: ['wim']
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2ltLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC13aW0vIiwic291cmNlcyI6WyJsaWIvd2ltLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQWEsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRW5GLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7OztBQUUzQztJQU1FLHNCQUNVLFVBQXNCLEVBQ3RCLFNBQW9CLEVBQ3BCLFVBQXNCO1FBRnRCLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDdEIsY0FBUyxHQUFULFNBQVMsQ0FBVztRQUNwQixlQUFVLEdBQVYsVUFBVSxDQUFZO0lBQzdCLENBQUM7SUFFSixrQ0FBVyxHQUFYO1FBQ0UsSUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUNwRCxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBRSxXQUFXLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDL0UsQ0FBQzsrREFaVSxZQUFZLDZGQUFaLFlBQVk7dUJBUHpCO0NBb0JDLEFBaEJELElBZ0JDO1NBYlksWUFBWTttQ0FBWixZQUFZO2NBSHhCLFNBQVM7ZUFBQztnQkFDVCxRQUFRLEVBQUUsT0FBTzthQUNsQjs7a0JBRUUsS0FBSzttQkFBQyxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBJbnB1dCwgT25DaGFuZ2VzLCBSZW5kZXJlcjIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgV2ltU2VydmljZSB9IGZyb20gJy4vd2ltLnNlcnZpY2UnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbd2ltXScsXG59KVxuZXhwb3J0IGNsYXNzIFdpbURpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG4gIEBJbnB1dCgnd2ltJykgd2ltOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgIHByaXZhdGUgcmVuZGVyZXIyOiBSZW5kZXJlcjIsXG4gICAgcHJpdmF0ZSB3aW1TZXJ2aWNlOiBXaW1TZXJ2aWNlXG4gICkge31cblxuICBuZ09uQ2hhbmdlcygpIHtcbiAgICBjb25zdCBodG1sID0gdGhpcy53aW1TZXJ2aWNlLnRvSHRtbCh0aGlzLndpbSB8fCAnJyk7XG4gICAgdGhpcy5yZW5kZXJlcjIuc2V0UHJvcGVydHkodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdpbm5lckhUTUwnLCBodG1sKTtcbiAgfVxufVxuIl19