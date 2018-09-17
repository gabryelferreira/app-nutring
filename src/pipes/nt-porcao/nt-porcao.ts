import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the NtPorcaoPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'ntPorcao',
})
export class NtPorcaoPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(input: any, args?: any): any {
    let meses = ['great', 'warning', 'bad'];

    if (input < 750)
      return 'traco great';
    else if (input < 1250)
      return 'traco warning';
    else
      return 'traco bad';
  }

}
