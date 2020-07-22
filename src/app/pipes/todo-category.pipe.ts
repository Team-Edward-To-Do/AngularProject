import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'todoCategory'
})
export class TodoCategoryPipe implements PipeTransform {

  transform(value: string): string {
    const startOfDelineator = value.indexOf('&*(');
    if (startOfDelineator !== -1 && value.substring(startOfDelineator).length >= 4) {
      return value.substring(startOfDelineator + 3);
    } else {
      return 'General';
    }
  }
}
