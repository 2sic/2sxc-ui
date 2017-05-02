import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'templates'
})
export class TemplatesPipe implements PipeTransform {

  transform(templates: any[], args?: any): any {
    return templates
      .filter(t => !t.IsHidden && t.ContentTypeStaticName === (args.contentTypeId || ''));
  }
}
