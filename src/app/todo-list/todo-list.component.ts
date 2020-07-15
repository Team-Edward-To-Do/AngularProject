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
  pageTitle = 'Todo List';
  listOfTodos: Todo[];
  todoName: string;

  filteredTodos: Todo[];

  attrListFilter = '';
  get listFilter(): string {
      return this.attrListFilter;
  }
  set listFilter(temp: string) {
      this.attrListFilter = temp;
      this.filteredTodos = this.attrListFilter ?
      this.performFilter(this.attrListFilter) : this.listOfTodos;
  }

  todos = new FormGroup({
    title: new FormControl('')
  });

  performFilter(filterBy: string): Todo[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.listOfTodos.filter((singleTodo: Todo) =>
    singleTodo.title.toLocaleLowerCase().indexOf(filterBy) !== -1);
}

  constructor(private todoService: TodoService) { }

  getTodos(): void {
    this.todoService.getTodos().subscribe(
      response => {
        this.listOfTodos = response;
        this.filteredTodos = this.listOfTodos;
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

  completeTodo(todo): void {
    let todoId = todo.id;
    this.todoService.completeTodo(todoId).subscribe(
      response => {
        console.log(response);
        this.getTodos();
      }
    )
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
      );
    }
  }

  ngOnInit(): void {
    console.log('init');
    this.getTodos();
  }
}
