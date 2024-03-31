import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Todo } from '../todo';
import { map } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { CheckDatePipe } from '../pipes/checkDate.pipe';
import { DaysSinceCreationPipe } from '../pipes/daysSinceCreation.pipe';


@Component({
  selector: 'todo-details',
  imports: [CommonModule, CheckDatePipe, DaysSinceCreationPipe],
  standalone: true,
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})

export class DetailsComponent implements OnInit {
  todo: Todo | undefined;

  constructor(private httpClient: HttpClient, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Extract the ID from the route parameters
    const Id = Number(this.route.snapshot.paramMap.get('Id')); // Use 'Id' instead of 'id'

    // Call the fetchDataById method with the extracted ID
    this.fetchDataById(Id).subscribe(todo => {
      this.todo = todo; // Assign the fetched data to the component property
    });
  }

  // Define a method to fetch data for a specific ID
  fetchDataById(Id: number) { // Use 'Id' instead of 'id'
    // Make an HTTP GET request to fetch all data
    return this.httpClient.get<Todo[]>('https://boyumcodechallenge.azurewebsites.net/api/todolist').pipe(
      // Filter the data based on the provided ID
      map(data => {
        const filteredTodo = data.find(item => item.Id === Id); // Use 'Id' instead of 'id'
        console.log('Filtered Todo:', filteredTodo); // Log the filtered todo
        return filteredTodo;
      })
    );
  }
}


