import { ElementRef } from '@angular/core';

export class AppTagService {
    constructor(
        private el: ElementRef
    ) {
    }
    
    public getAttribute(attribute: string): string {
        // todo: after upgrading to NG8, probably use el.GetAttribute
        return this.el.nativeElement.getAttribute(attribute);
    }
}
