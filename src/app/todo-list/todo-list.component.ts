import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { TodoService } from '../services/todo-service.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  listOfTodos: string[];
  todoName: string;

  todos = new FormGroup({
    title: new FormControl('')
  });

  constructor(private todoService: TodoService) { }

  postTodoEc2(todoSub: FormGroup): void {
    let form = JSON.stringify(todoSub.value);
    this.todoService.postTodo(form).subscribe(
      response => {
        console.log('success');
        this.getTodosEc2();
      }
    );
  }

  getTodosEc2(): void {
    this.todoService.getTodos().subscribe(
      response => {
        this.listOfTodos = response;
      }
    );
  }

  ngOnInit(): void {
    console.log('init');
    this.getTodosEc2();
  }
}
