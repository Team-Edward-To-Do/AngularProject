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
  uncompleteTodo: Todo;

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
    title: new FormControl(''),
    completed: new FormControl(''),
    id: new FormControl('')
  });


  performFilter(filterBy: string): Todo[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.listOfTodos.filter((singleTodo: Todo) =>
    singleTodo.title.toLocaleLowerCase().indexOf(filterBy) !== -1);
}

  constructor(private todoService: TodoService) {
    this.getTodos();
  }

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

  updateTodo(title: string, id: number, createdOn: any): void {
    this.uncompleteTodo = {
                          title: title,
                          completed: false,
                          id: id,
                          createdOn: createdOn
    }
    let form = JSON.stringify(this.uncompleteTodo);
    this.todoService.updateTodo(form).subscribe(
      response => {
        console.log(response);
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
  }
}
