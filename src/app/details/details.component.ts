import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Todo } from '../todo';
import { catchError, map } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { CheckDatePipe } from '../pipes/checkDate.pipe';
import { DaysSinceCreationPipe } from '../pipes/daysSinceCreation.pipe';
import { TodoService } from '../todo.service';



@Component({
  selector: 'todo-details',
  imports: [CommonModule, CheckDatePipe, DaysSinceCreationPipe],
  standalone: true,
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
  providers: [TodoService]
})


export class DetailsComponent implements OnInit {
  todo: Todo | undefined; // Initialize todo 

  constructor(private route: ActivatedRoute, private todoService: TodoService) { }

  ngOnInit(): void {
    // Extract todo ID from route parameters
    const Id = Number(this.route.snapshot.paramMap.get('Id'));

    // Fetch todo by ID
    this.fetchDataById(Id).subscribe(
      // Assign fetched todo to component 
      todo => {
        this.todo = todo;
      }
    );
  }

  // Fetch todo by ID from the service
  fetchDataById(Id: number) {
    return this.todoService.getTodos().pipe(
      // Filter todos to find the one with the matching ID
      map(data => {
        const filteredTodo = data.find(item => item.Id === Id);
        console.log('Filtered Todo:', filteredTodo);
        return filteredTodo; // Filtered todo
      }),
      // Ereor handling
      catchError((error) => {
        console.error('Error fetching todo by ID:', error);
        throw error;
      })
    );
  }
}