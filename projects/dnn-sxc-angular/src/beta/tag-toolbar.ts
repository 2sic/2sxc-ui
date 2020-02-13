import {
    Directive,
    ElementRef,
    Input,
    OnInit
} from '@angular/core';

@Directive({
    selector: '[sxc-toolbar]'
})
export class SxcTagToolbarDirective implements OnInit {
    private _el: ElementRef;
    @Input('sxc-toolbar') sxcToolbar: any;
    
    constructor(el: ElementRef) {
        this._el = el;
    }

    ngOnInit() {
        this._el.nativeElement.setAttribute("sxc-toolbar", JSON.stringify(this.sxcToolbar));
    }
}