import { Pipe, PipeTransform } from '@angular/core';
import { DeprecatedDecimalPipe} from '@angular/common';

@Pipe({
  name: 'ntNumber'
})
export class NtNumberPipe extends DeprecatedDecimalPipe implements PipeTransform {


  transform(input: any, args?: any): any {
    if (!input || input == "" || input == null || input == undefined)
      return 0;

    var exp, rounded,
      suffixes = ['k', 'M', 'B', 'T', 'Q', 'QQ'];

    if (Number.isNaN(input)) {
      return 0;
    }
    var number = parseFloat(input);
    var n = number.toFixed(2);
    input = n.toString();

    if (input < 1000000) {
      
      var inputSplit = input;
      if (input.indexOf('.') != -1){
        inputSplit = input.split('.')[0];
      }
      
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
      if (input.indexOf('.') != -1){
        var afterComma = input.split('.')[1];
        if (afterComma != '00'){
          newInput += ',' + input.split('.')[1];
        }
      }
      return newInput;
    }

    exp = Math.floor(Math.log(input) / Math.log(1000));

    return (input / Math.pow(1000, exp)).toFixed(args) + suffixes[exp - 1];
  }

}