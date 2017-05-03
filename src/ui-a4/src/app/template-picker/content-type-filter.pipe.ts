import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'contentTypeFilter'
})
export class ContentTypeFilterPipe implements PipeTransform {

  transform(templates: any[]): any {
    return templates
      .filter(t => !t.IsHidden);
  }
}
