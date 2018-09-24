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

    if (input < 1000000) {
      return super.transform(input);
    }

    exp = Math.floor(Math.log(input) / Math.log(1000));

    return (input / Math.pow(1000, exp)).toFixed(args) + suffixes[exp - 1];


  }

}