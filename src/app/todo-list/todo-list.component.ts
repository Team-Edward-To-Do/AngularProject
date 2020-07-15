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
  listOfTodos: string[];
  todoName: string;

  todosList: Todo[];
  filteredTodos: Todo[];
  // Filter fields
  attrListFilter = 'This is the intial Value';
  get listFilter(): string {
      return this.attrListFilter;
  }
  set listFilter(temp: string) {
      this.attrListFilter = temp;
      this.filteredTodos = this.attrListFilter ?
      this.performFilter(this.attrListFilter) : this.todosList;
  }


  todos = new FormGroup({
    title: new FormControl('')
  });

  performFilter(filterBy: string): Todo[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.todosList.filter((amazinggoal: Todo) =>
    amazinggoal.title.toLocaleLowerCase().indexOf(filterBy) !== -1);
}

  constructor(private todoService: TodoService) { }

  getTodosEc2(): void {
    this.todoService.getTodos().subscribe(
      response => {
        this.listOfTodos = response;
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
    this.getTodosEc2();
  }
}
