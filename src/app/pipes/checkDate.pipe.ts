import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
    standalone: true,
    name: 'checkDate'
})
export class CheckDatePipe implements PipeTransform {

    transform(value: any, format: string = 'dd-MM-YYYY'): any {
        // Convert the value to a Date object
        const dateValue = new Date(value);

        // Check if the date value is valid
        if (isNaN(dateValue.getTime())) {
            // Return 'Invalid date' if the value is not valid
            return 'Invalid date';
        }

        // If the date value is valid, transform it into the format from above
        return new DatePipe('en-UK').transform(dateValue, format);
    }

}
