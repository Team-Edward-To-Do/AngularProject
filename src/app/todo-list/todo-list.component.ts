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
  listOfTodos: Todo[];
  todoName: string;

  todos = new FormGroup({
    title: new FormControl('')
  });

  constructor(private todoService: TodoService) {
     this.getTodos();
  }

  getTodos(): void {
    this.todoService.getTodos().subscribe(
      response => {
        this.listOfTodos = response;
      }
    );
  }

  postTodo(todoSub: FormGroup): void {
    let form = JSON.stringify(todoSub.value);
    this.todoService.postTodo(form).subscribe(
      response => {
        console.log('success');
        this.getTodos();
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
          this.getTodos();
        }
      )
    }
  }

  ngOnInit(): void {
    console.log('init');
  }
}
