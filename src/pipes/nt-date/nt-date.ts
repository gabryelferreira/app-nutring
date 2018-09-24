import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the NtDatePipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'ntDate',
})
export class NtDatePipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, ...args) {
    
    let meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

    try {
      let val = value.split('-');
      let date = val[2].toString() + " de " + meses[parseInt(val[1]) - 1] + " de " + val[0].toString();
      return date;
    } catch(e) {
      return value;
    }

    
  }
}
