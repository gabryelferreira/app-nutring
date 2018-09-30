import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the NtCurtidasPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'curtidas',
})
export class NtCurtidasPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(input: any, args?: any): any {
    if (!input || input == "" || input == null || input == undefined)
      return 0;

    if (Number.isNaN(input)) {
      return 0;
    }
      
    var inputSplit = input.toString();
    
    var index = 0;
    var inputReverse = [];
    for (var i = inputSplit.length - 1; i >= 0; i--){
      index++;
      if (index % 3 == 0 && i != 0){
        index = 0;
        inputReverse.push(inputSplit.charAt(i));
        inputReverse.push(".");
      } else {
        inputReverse.push(inputSplit.charAt(i));
      }
    }
    inputReverse = inputReverse.reverse();
    var newInput = "";
    inputReverse.forEach(elem => {
      newInput += elem;
    });

    return newInput;
  }
}
