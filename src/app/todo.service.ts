import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo } from './todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private api = 'https://boyumcodechallenge.azurewebsites.net/api/todolist'; // API endpoint

  constructor(private httpClient: HttpClient) { }

  // Get todos from the API
  getTodos(): Observable<Todo[]> {
    return this.httpClient.get<Todo[]>(this.api);
  }

  // Add a new todo 
  addTodo(todo: Todo): Observable<any> {
    return this.httpClient.post(this.api, todo);
  }
}
