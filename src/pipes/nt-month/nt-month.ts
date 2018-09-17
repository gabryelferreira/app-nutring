import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the NtMonthPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'ntMonth',
})
export class NtMonthPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(input: any, args?: any): any {
    let meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

    return meses[input - 1];

  }

  
}
