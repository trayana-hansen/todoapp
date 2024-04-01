import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Todo } from '../todo';
import { catchError, map } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { CheckDatePipe } from '../pipes/checkDate.pipe';
import { DaysSinceCreationPipe } from '../pipes/daysSinceCreation.pipe';
import { TodoService } from '../todo.service';
import { throwError } from 'rxjs';


@Component({
  selector: 'todo-details',
  imports: [CommonModule, CheckDatePipe, DaysSinceCreationPipe],
  standalone: true,
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
  providers: [TodoService]
})

export class DetailsComponent implements OnInit {
  todo: Todo | undefined;

  constructor(private route: ActivatedRoute, private todoService: TodoService) { }

  ngOnInit(): void {
    // Extract the ID from the route parameters
    const Id = Number(this.route.snapshot.paramMap.get('Id'));

    this.fetchDataById(Id).subscribe(todo => {
      this.todo = todo;
    });
  }


  fetchDataById(Id: number) {
    return this.todoService.getTodos().pipe(
      map(data => {
        const filteredTodo = data.find(item => item.Id === Id);
        console.log('Filtered Todo:', filteredTodo);
        return filteredTodo;
      }),
      catchError((error) => {
        console.error('Error fetching todo by ID:', error);
        throw error;
      })
    );
  }

}
