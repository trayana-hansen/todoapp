import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
    standalone: true,
    name: 'checkDate'
})
export class CheckDatePipe implements PipeTransform {
    transform(value: any, format: string = 'dd-MM-YYYY'): any {
        const dateValue = new Date(value);
        if (isNaN(dateValue.getTime())) {
            return 'No data';
        }
        return new DatePipe('en-UK').transform(dateValue, format);
    }

}

