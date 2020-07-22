import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'todoName'
})
export class TodoNamePipe implements PipeTransform {

  transform(value: string): string {
    const startOfDelineator = value.indexOf('&*(');
    if (startOfDelineator !== -1) {
      return value.substring(0, startOfDelineator);
    } else {
      return value;
    }
  }
}
