import { Pipe, PipeTransform } from '@angular/core';
import { cViewWithoutContent } from './constants';

@Pipe({
  name: 'templateFilter'
})
export class TemplateFilterPipe implements PipeTransform {
  transform(templates: any[], args: any): any[] {
    return templates
      .filter(t => !t.IsHidden && (!args.isContentApp
        || t.ContentTypeStaticName === (args.contentTypeId === cViewWithoutContent ? '' : (args.contentTypeId || ''))));
  }
}
