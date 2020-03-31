import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'debug', pure: true })
export class DebugPipe implements PipeTransform {
    transform<T>(obj: T, note: string): T {
        console.log(`pd:${note} (${typeof(obj)})`, obj);
        return obj;
    }
}
