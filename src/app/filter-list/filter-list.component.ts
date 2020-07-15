import { Component, OnInit } from '@angular/core';
import { Todo } from '../todo';
import { TodoService } from '../services/todo-service.service';

@Component({
  selector: 'app-filter-list',
  templateUrl: './filter-list.component.html',
  styleUrls: ['./filter-list.component.css']
})
export class FilterListComponent implements OnInit {
  pageTitle = 'Todo List';
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
  performFilter(filterBy: string): Todo[] {
      filterBy = filterBy.toLocaleLowerCase();
      return this.todosList.filter((amazinggoal: Todo) =>
      amazinggoal.title.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  constructor(private todoServ: TodoService) {
    this.todosList = todoServ.getTodos();
    this.filteredTodos = this.todosList;
   }

  ngOnInit(): void {
  }

}
