import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo } from '../todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  url = 'http://ec2-34-220-194-190.us-west-2.compute.amazonaws.com:8080/todos';

  constructor(private httpCli: HttpClient) { 
  }
  getTodos(): Observable<Todo[]> {
    const httpHead = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Orgin': '*'
      })
    };
    return this.httpCli.get<Todo[]>(this.url, httpHead);
  }

  getTodo(todoId): Observable<Todo> {
    const httpHead = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Orgin': '*'
      })
    };
    return this.httpCli.get<Todo>(this.url + '/' + todoId, httpHead);
  }

  postTodo(todoForm): Observable<string> {
    const httpHead = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Orgin': '*'
      })
    };
    return this.httpCli.post<string>(this.url, todoForm, httpHead);
  }

  updateTodo(todoForm): Observable<Todo> {
    const httpHead = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Orgin': '*'
      })
    };
    return this.httpCli.put<Todo>(this.url, todoForm, httpHead);
  }

  completeTodo(todoId): Observable<Todo> {
    const httpHead = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Orgin': '*'
      })
    };
    return this.httpCli.patch<Todo>(this.url + '/' + todoId, httpHead);
  }

  deleteTodo(todoId): Observable<string> {
    const httpHead = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Orgin': '*'
      })
    };
    return this.httpCli.delete<string>(this.url + '/' + todoId, httpHead);
  }
}
