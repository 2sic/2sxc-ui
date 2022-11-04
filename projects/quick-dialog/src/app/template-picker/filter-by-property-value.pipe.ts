import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'filterByPropertyValue' })
export class FilterByPropertyValuePipe implements PipeTransform {
  transform<T>(input: T[], propertyName: string, filterValue: string): T[] {
    return input?.filter(i => i[propertyName]?.toLocaleLowerCase?.().includes?.(filterValue?.toLocaleLowerCase?.())) ?? input;
  }
}


@Pipe({ name: 'filterByBoolProperty' })
export class FilterByBoolPropertyPipe implements PipeTransform {
  transform<T>(input: T[], propertyName: string, filterValue: boolean): T[] {
    // console.log('debug 2dm', input);
    return input?.filter(i => i[propertyName] === filterValue) ?? input;
  }
}
