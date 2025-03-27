import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "filterByPropertyValue",
  standalone: true,
})
export class FilterByPropertyValuePipe implements PipeTransform {
  transform<T>(input: T[], propertyName: string, filterValue: string): T[] {
    return (
      input?.filter((i) =>
        i[propertyName]
          ?.toLocaleLowerCase?.()
          .includes?.(filterValue?.toLocaleLowerCase?.())
      ) ?? input
    );
  }
}

@Pipe({
  name: "filterByBoolProperty",
  standalone: true,
})
export class FilterByBoolPropertyPipe implements PipeTransform {
  transform<T>(input: T[], propertyName: string, filterValue: boolean): T[] {
    // console.log('debug 2dm', input);
    return input?.filter((i) => i[propertyName] === filterValue) ?? input;
  }
}
