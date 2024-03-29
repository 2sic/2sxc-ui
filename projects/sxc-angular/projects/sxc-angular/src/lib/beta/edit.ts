import { Context } from '../context/context.service';
import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: 'sxc-toolbar'
})
export class SxcToolbarDirective implements OnInit {
  @Input() config: any = {};
  constructor(private elementRef: ElementRef, private context: Context) {}

  ngOnInit() {
    const sxc = this.context.sxc as any;
    if (!sxc.manage) return; // edit not available, probably not logged in
    this.elementRef.nativeElement.innerHTML = sxc.manage.getToolbar(this.config.toolbar, this.config.settings);
  }

}
