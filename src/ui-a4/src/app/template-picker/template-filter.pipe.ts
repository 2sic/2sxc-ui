import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'templateFilter'
})
export class TemplateFilterPipe implements PipeTransform {

  transform(templates: any[], args: any): any[] {
    return templates
      .filter(t => !t.IsHidden && (!args.isContentApp || t.ContentTypeStaticName === (args.contentTypeId || '')));
  }
}
