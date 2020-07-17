import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { identifierModuleUrl } from '@angular/compiler';
import { Todo } from '../todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  url = 'http://ec2-34-220-194-190.us-west-2.compute.amazonaws.com:8080/todos';

  constructor(private httpCli: HttpClient) { 
  }

  getObject(): Todo[] {
    return [
        {
          completed: false,
          createdOn: ' ',
          id: 0,
          title: ' '
        }
    ]
  }

  //getTodos(): Observable<Todo[]> {
  getTodos(): Observable<string[]> {
    const httpHead = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Orgin': '*'
      })
    };
    //return this.httpCli.get<Todo[]>(this.url, httpHead);
    return this.httpCli.get<string[]>(this.url, httpHead);
  }

  getTodo(todoId): Observable<Todo> {
    this.url = this.url + '/' + todoId;

    const httpHead = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Orgin': '*'
      })
    };
    return this.httpCli.get<Todo>(this.url, httpHead);
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
