import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { TodoService } from '../services/todo-service.service';
import { Todo } from '../todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  listOfTodos: string[];
  //listOfTodos: Todo[];
  todoName: string;

  todos = new FormGroup({
    title: new FormControl('')
  });

  constructor(private todoService: TodoService) {
     //this.listOfTodos = todoService.getObject();
     this.getTodosEc2();
     console.log("TodoListComponent - constructor");
     //console.log(this.listOfTodos);
  }

  getTodosEc2(): void {
    this.todoService.getTodos().subscribe(
      response => {
        this.listOfTodos = response;
        console.log("response - " + response);
        console.log("listOfTodos - " + this.listOfTodos);
      }
    );
  }

  postTodoEc2(todoSub: FormGroup): void {
    let form = JSON.stringify(todoSub.value);
    this.todoService.postTodo(form).subscribe(
      response => {
        console.log('success');
        this.getTodosEc2();
      }
    );
  }

  deleteTodo(todo): void {
    let name = todo.title;
    if (confirm('Are you sure want to delete this todo: ' + name)) {
      let todoId = todo.id;
      this.todoService.deleteTodo(todoId).subscribe(
        response => {
          console.log('success');
          this.getTodosEc2();
        }
      )
    }
  }

  ngOnInit(): void {
    console.log('init');
    //this.getTodosEc2();
  }
}
