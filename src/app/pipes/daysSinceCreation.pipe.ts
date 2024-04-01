import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    standalone: true,
    name: 'daysSinceCreation'

})
export class DaysSinceCreationPipe implements PipeTransform {

    transform(value: any): any {
        // Convert the value to a Date
        const dateValue = new Date(value);

        // Check if the date value is valid
        if (isNaN(dateValue.getTime())) {
            // Ruturn no data if it's not valid
            return 'No data';
        }

        // Calculate the difference in time between the current date and the given date
        const currentDate = new Date();
        const differenceInTime = currentDate.getTime() - dateValue.getTime();

        // Calculate the number of days between the two dates
        return Math.floor(differenceInTime / (1000 * 3600 * 24));
    }
}