import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    standalone: true,
    name: 'daysSinceCreation'

})
export class DaysSinceCreationPipe implements PipeTransform {
    transform(value: any): any {
        const dateValue = new Date(value);
        if (isNaN(dateValue.getTime())) {
            return 'No data';
        }


        const currentDate = new Date();
        const differenceInTime = currentDate.getTime() - dateValue.getTime();
        return Math.floor(differenceInTime / (1000 * 3600 * 24));
    }
}