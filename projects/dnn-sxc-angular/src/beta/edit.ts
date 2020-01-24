import { Context } from '../context/context.service';
import {
    Directive,
    ElementRef,
    Input,
    OnInit,
} from '@angular/core';
import { SxcInstanceWithEditing } from '@2sic.com/2sxc-typings';

@Directive({
  selector: 'sxc-toolbar'
})
export class SxcToolbarDirective implements OnInit {
  @Input() config: any = {};
  constructor(private elementRef: ElementRef, private context: Context) {}

  ngOnInit() {
    const sxc = this.context.contextInfo.sxc as SxcInstanceWithEditing;
    if (!sxc.manage) return; // edit not available, probably not logged in
    this.setHtml(sxc.manage.getToolbar(this.config.toolbar, this.config.settings));
  }

  setHtml(html: string) {
    this.elementRef.nativeElement.innerHTML = html;
  }
}