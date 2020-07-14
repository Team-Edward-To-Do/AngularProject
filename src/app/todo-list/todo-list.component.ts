import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { TodoService } from '../services/todo-service.service';
import { Todo } from '../todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit, OnChanges {
  listOfTodos: string[];
  todoName: string;

  todos = new FormGroup({
    title: new FormControl('')
  });

  constructor(private rocp: TodoService) { }

  postTodoEc2(todoSub: FormGroup): void {
    let form = JSON.stringify(todoSub.value);
    this.rocp.postTodo(form).subscribe(
      response => {
        console.log('success');
        this.rocp.getTodos().subscribe(
          response => {
            this.listOfTodos = response;
          }
        );
      }
    );
  }

  getTodosEc2(): void {
    this.rocp.getTodos().subscribe(
      response => {
        console.log(response);
      }
    );
  }

  

  ngOnInit(): void {
    console.log('init');
    this.rocp.getTodos().subscribe(
      response => {
        this.listOfTodos = response;
      }
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('changed');
    this.rocp.getTodos().subscribe(
      response => {
        this.listOfTodos = response;
      }
    );
  }

}
