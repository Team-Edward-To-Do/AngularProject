import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private httpCli: HttpClient) { }

  postTodo(todoForm): Observable<string> {
    const httpHead = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Orgin': '*'
      })
    };
    return this.httpCli.post<string>('http://ec2-34-220-194-190.us-west-2.compute.amazonaws.com:8080/todos', todoForm, httpHead);
  }

  getTodos(): Observable<string[]> {
    const httpHead = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Orgin': '*'
      })
    };
    return this.httpCli.get<string[]>('http://ec2-34-220-194-190.us-west-2.compute.amazonaws.com:8080/todos', httpHead);
  }
}
