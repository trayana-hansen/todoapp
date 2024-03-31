import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Todo } from '../todo';
import { Router, RouterModule } from '@angular/router';
import { CheckDatePipe } from '../pipes/checkDate.pipe';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSnackBar } from '@angular/material/snack-bar';




@Component({
  selector: 'to-do-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, CheckDatePipe, ReactiveFormsModule, MatInputModule, MatButtonModule, MatFormFieldModule, MatDatepickerModule, MatNativeDateModule, MatCheckboxModule, MatSnackBarModule],
  providers: [HttpClient],
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.scss'],

})
export class ToDoListComponent implements OnInit {
  data: Todo[] = [];
  todoForm!: FormGroup;
  nextId: number = 7;

  constructor(private httpClient: HttpClient, private router: Router, private formBuilder: FormBuilder, private snackBar: MatSnackBar) { }
  // 

  ngOnInit(): void {
    this.fetchData();
    this.todoForm! = this.formBuilder.group({
      name: ['', Validators.required],
      description: [''],
      done: [false],
      expenses: [null, [Validators.required, Validators.pattern(/^[0-9]*$/)]],
      created: [new Date()]
    });
  }

  fetchData() {
    this.httpClient
      .get<Todo[]>('https://boyumcodechallenge.azurewebsites.net/api/todolist')
      .pipe(
        tap((data: Todo[]) => {
          this.data = data;
        }),
        catchError((error) => {
          console.error('Error fetching todos:', error);
          return throwError(() => error);
        })
      )
      .subscribe();
  }

  onSubmit() {
    if (this.todoForm.valid) {
      const formData = this.todoForm.value;
      const newTodo: Todo = {
        Id: this.nextId++,
        Name: formData.name,
        Description: formData.description,
        Done: formData.done,
        Expenses: formData.expenses,
        Created: formData.created
      };

      this.addTodo(newTodo).subscribe(() => {
        this.snackBar.open('Todo added successfully', 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        });
        setTimeout(() => {
          this.todoForm.reset();
        }, 5000);

      }, (error) => {
        console.error('Error adding todo:', error);
      });
    }
  }

  addTodo(newTodo: Todo) {

    return this.httpClient.post('https://boyumcodechallenge.azurewebsites.net/api/todolist', newTodo);
  }
}
