import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the NtDateBrPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'ntDateBr',
})
export class NtDateBrPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, ...args) {
    
    try {
      let val = value.split('-');
      let date = val[2].toString() + "/" + val[1].toString() + "/" + val[0].toString();
      return date;
    } catch(e) {
      return value;
    }

    
  }
}
