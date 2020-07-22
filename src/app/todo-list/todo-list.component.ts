import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { TodoService } from '../services/todo-service.service';
import { SharedService } from '../services/shared.service';
import { Todo } from '../todo';


@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  listOfTodos: Todo[];
  filteredTodos: Todo[];
  todoName: string;
  uncompleteTodo: Todo;
  attrListFilter = '';

  attrName = '';
  attrCategory = '';

  todos = new FormGroup({
    title: new FormControl('')
  });

  constructor(private todoService: TodoService, private sharedService: SharedService) {
    this.getTodos();
  }

  get createName(): string {
    return this.attrName;
  }

  set createName(temp: string) {
    this.attrName = temp;
    this.todos.setValue({title: this.attrName + '&*(' + this.attrCategory});
  }

  get createCategory(): string {
    return this.attrCategory;
  }

  set createCategory(temp: string) {
    this.attrCategory = temp;
    this.todos.setValue({title: this.attrName + '&*(' + this.attrCategory});
  }

  get listFilter(): string {
    return this.attrListFilter;
  }

  set listFilter(temp: string) {
    this.attrListFilter = temp;
    this.filteredTodos = this.attrListFilter ?
    this.performFilter(this.attrListFilter) : this.listOfTodos;
  }

  performFilter(filterBy: string): Todo[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.listOfTodos.filter((singleTodo: Todo) =>
    singleTodo.title.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  emitActiveTab(activeTab: string): void {
    this.sharedService.emitChange('todoInfo');
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
    console.log(this.attrName);
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
    };
    const form = JSON.stringify(this.uncompleteTodo);
    this.todoService.updateTodo(form).subscribe(
      response => {
        console.log(response);
        this.getTodos();
      }
    );
  }

  completeTodo(todo): void {
    const todoId = todo.id;
    this.todoService.completeTodo(todoId).subscribe(
      response => {
        console.log(response);
        this.getTodos();
      }
    )
  }

  deleteTodo(todo): void {
    const name = todo.title;
    if (confirm('Are you sure want to delete this todo: ' + name)) {
      const todoId = todo.id;
      this.todoService.deleteTodo(todoId).subscribe(
        response => {
          console.log('success');
          this.getTodos();
        }
      );
    }
  }

  ngOnInit(): void {
  }
}
