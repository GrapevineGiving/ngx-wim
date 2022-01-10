import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { WimService } from './wim.service';
import * as i0 from "@angular/core";
import * as i1 from "./wim.service";
export class WimDirective {
    constructor(elementRef, renderer2, wimService) {
        this.elementRef = elementRef;
        this.renderer2 = renderer2;
        this.wimService = wimService;
    }
    ngOnChanges() {
        const html = this.wimService.toHtml(this.wim || '');
        this.renderer2.setProperty(this.elementRef.nativeElement, 'innerHTML', html);
    }
}
/** @nocollapse */ WimDirective.ngDirectiveDef = i0.ɵɵdefineDirective({ type: WimDirective, selectors: [["", "wim", ""]], factory: function WimDirective_Factory(t) { return new (t || WimDirective)(i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i0.Renderer2), i0.ɵɵdirectiveInject(i1.WimService)); }, inputs: { wim: "wim" }, features: [i0.ɵɵNgOnChangesFeature()] });
/*@__PURE__*/ i0.ɵsetClassMetadata(WimDirective, [{
        type: Directive,
        args: [{
                selector: '[wim]',
            }]
    }], function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i1.WimService }]; }, { wim: [{
            type: Input,
            args: ['wim']
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2ltLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC13aW0vIiwic291cmNlcyI6WyJsaWIvd2ltLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQWEsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRW5GLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7OztBQUszQyxNQUFNLE9BQU8sWUFBWTtJQUd2QixZQUNVLFVBQXNCLEVBQ3RCLFNBQW9CLEVBQ3BCLFVBQXNCO1FBRnRCLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDdEIsY0FBUyxHQUFULFNBQVMsQ0FBVztRQUNwQixlQUFVLEdBQVYsVUFBVSxDQUFZO0lBQzdCLENBQUM7SUFFSixXQUFXO1FBQ1QsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUNwRCxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBRSxXQUFXLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDL0UsQ0FBQzs7MkRBWlUsWUFBWSw2RkFBWixZQUFZO21DQUFaLFlBQVk7Y0FIeEIsU0FBUztlQUFDO2dCQUNULFFBQVEsRUFBRSxPQUFPO2FBQ2xCOztrQkFFRSxLQUFLO21CQUFDLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIElucHV0LCBPbkNoYW5nZXMsIFJlbmRlcmVyMiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBXaW1TZXJ2aWNlIH0gZnJvbSAnLi93aW0uc2VydmljZSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1t3aW1dJyxcbn0pXG5leHBvcnQgY2xhc3MgV2ltRGlyZWN0aXZlIGltcGxlbWVudHMgT25DaGFuZ2VzIHtcbiAgQElucHV0KCd3aW0nKSB3aW06IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgcHJpdmF0ZSByZW5kZXJlcjI6IFJlbmRlcmVyMixcbiAgICBwcml2YXRlIHdpbVNlcnZpY2U6IFdpbVNlcnZpY2VcbiAgKSB7fVxuXG4gIG5nT25DaGFuZ2VzKCkge1xuICAgIGNvbnN0IGh0bWwgPSB0aGlzLndpbVNlcnZpY2UudG9IdG1sKHRoaXMud2ltIHx8ICcnKTtcbiAgICB0aGlzLnJlbmRlcmVyMi5zZXRQcm9wZXJ0eSh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ2lubmVySFRNTCcsIGh0bWwpO1xuICB9XG59XG4iXX0=