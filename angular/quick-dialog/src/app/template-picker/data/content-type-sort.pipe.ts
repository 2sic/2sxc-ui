import { Pipe, PipeTransform } from '@angular/core';
import { ContentType } from '../content-type';

@Pipe({
  name: 'contentTypeSort'
})
export class ContentTypeSortPipe implements PipeTransform {

  transform(contentTypes: ContentType[], translator: any): any {
    console.log('contentypesort', translator);
    if (contentTypes)
      return contentTypes.sort((a, b) => ('' + a.Name).localeCompare(b.Name));
    return contentTypes;
  }

}
