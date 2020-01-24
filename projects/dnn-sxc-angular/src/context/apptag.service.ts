import { ElementRef } from '@angular/core';

export class AppTagService {
    constructor(
        private el: ElementRef
    ) {
    }
    
    public getTag(attribute: string) {
        // todo: after upgrading to NG8, probably use el.GetAttribute
        return this.el.nativeElement.getAttribute(attribute);
    }
}
