import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'filterByPropertyValue' })
export class FilterByPropertyValuePipe implements PipeTransform {
  transform<T>(input: T[], propertyName: string, filterValue: string): T[] {
    return input?.filter(i => i[propertyName]?.toLocaleLowerCase?.().includes?.(filterValue?.toLocaleLowerCase?.())) ?? input;
  }
}
