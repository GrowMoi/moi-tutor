import { Pipe, PipeTransform } from '@angular/core';
import _ from 'lodash';

@Pipe({
  name: 'format'
})
export class FormatPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return _.map(value, (item) => item);
  }

}
