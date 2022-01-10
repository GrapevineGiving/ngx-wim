import { ElementRef, OnChanges, Renderer2 } from '@angular/core';
import { WimService } from './wim.service';
import * as i0 from "@angular/core";
export declare class WimDirective implements OnChanges {
    private elementRef;
    private renderer2;
    private wimService;
    wim: string;
    constructor(elementRef: ElementRef, renderer2: Renderer2, wimService: WimService);
    ngOnChanges(): void;
    static ngDirectiveDef: i0.ɵɵDirectiveDefWithMeta<WimDirective, "[wim]", never, { 'wim': "wim" }, {}, never>;
}
