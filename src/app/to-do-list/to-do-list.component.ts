import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
import { TodoService } from '../todo.service';




@Component({
  selector: 'to-do-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, CheckDatePipe, ReactiveFormsModule, MatInputModule, MatButtonModule, MatFormFieldModule, MatDatepickerModule, MatNativeDateModule, MatCheckboxModule, MatSnackBarModule],
  providers: [TodoService],
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.scss'],

})

export class ToDoListComponent implements OnInit {
  data: Todo[] = []; // Array to store todos
  todoForm!: FormGroup; // Form group for todo input fields
  nextId: number = 7; // Next available todo ID bcs only 6 on the database currently

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private todoService: TodoService
  ) { }

  ngOnInit(): void {
    this.fetchData(); // Fetch todos on initialise
    this.todoForm = this.formBuilder.group({
      // Initialise todo form with validators
      name: ['', Validators.required],
      description: [''],
      done: [false],
      expenses: [null, [Validators.required, Validators.pattern(/^[0-9]*$/)]],
      created: [new Date()],
    });
  }

  fetchData(): void {
    // Fetch with the service
    this.todoService.getTodos().pipe(
      // Error handling
      catchError((error) => {
        console.error('Error fetching todos:', error);
        return throwError(() => error);
      })
    ).subscribe(
      // Store the fetched data in the component
      (todos: Todo[]) => {
        this.data = todos;
      }
    );
  }

  onSubmit(): void {
    if (this.todoForm.valid) {
      const formData = this.todoForm.value;
      const newTodo: Todo = {
        // Create a new todo object with the data from the inputs
        Id: this.nextId++,
        Name: formData.name,
        Description: formData.description,
        Done: formData.done,
        Expenses: formData.expenses,
        Created: formData.created
      };

      this.addTodo(newTodo); // Add the new todo
    }
  }

  addTodo(newTodo: Todo): void {
    this.todoService.addTodo(newTodo).pipe(
      // Success message after adding todo
      tap(() => {
        this.snackBar.open('Todo added successfully', 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        });
        setTimeout(() => {
          this.todoForm.reset(); // Reset the todo form after 3 seconds
        }, 3000);
      }),
      // Error handling
      catchError((error) => {
        console.error('Error adding todo:', error);
        return throwError(() => error);
      })
    ).subscribe(); // Subscribe to the addTodo observable to add the new todo to the database
  }
}