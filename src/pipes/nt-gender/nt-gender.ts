import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the NtGenderPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'ntGender',
})
export class NtGenderPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, ...args) {
    try {
      if (value == "M")
        return "Masculino";

      if (value == "F")
        return "Feminino";
      
      return value;
      
    } catch (e){
      return value;
    }
  }
}
