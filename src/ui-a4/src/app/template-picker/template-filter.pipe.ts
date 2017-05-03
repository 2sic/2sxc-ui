import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'templateFilter'
})
export class TemplateFilterPipe implements PipeTransform {

  transform(templates: any[], contentTypeId: string): any[] {
    return templates
      .filter(t => !t.IsHidden && t.ContentTypeStaticName === (contentTypeId || ''));
  }
}
