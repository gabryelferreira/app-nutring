import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the NtNomePratoPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'ntNomePrato',
})
export class NtNomePratoPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(input: any, args?: any): any {
    let pratos = ['Café da manhã', 'Almoço', 'Lanche', 'Jantar'];

    input = input.replace(':', '.')
    if (input < 6)
      return 'Lanche';
    if (input < 11)
      return 'Café da manhã';
    else if (input < 15)
      return 'Almoço';
    else if (input < 19)
      return 'Lanche';
    else
      return 'Jantar';

  }


}
