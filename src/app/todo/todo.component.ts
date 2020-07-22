import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TodoService } from '../services/todo-service.service';
import { SharedService } from '../services/shared.service';
import { ITodo } from '../todo';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  currentTodo: ITodo;
  currentTodoSelected = false;
  currentId: string;
  uncompleteTodo: ITodo;
  doUpdate: boolean; // Whether to do updates or not. true - update, false - no update
  attrName: string;
  attrCategory: string;

  constructor(private route: ActivatedRoute, private todoService: TodoService, private sharedService: SharedService) {
    this.currentId = this.route.snapshot.paramMap.get('id');
    if (this.currentId !== 'noTodo') {
      this.getTodo(this.currentId);
      this.currentTodoSelected = true;
    } else {
      this.currentTodoSelected = false;
    }
    this.doUpdate = false;
  }

  get updateName(): string {
    return this.attrName;
  }

  set updateName(temp: string) {
    this.attrName = temp;
  }

  // gets a Todo by it's Id
  getTodo(currentId): void {
    this.todoService.getTodo(currentId).subscribe(
      response => {
        this.currentTodo = response;
        this.attrName = this.getName(this.currentTodo.title);
        this.attrCategory = this.getDelineatorPlusCategory(this.currentTodo.title);
      }
    );
  }

  emitActiveTab(activeTab: string): void {
    this.sharedService.emitChange(activeTab);
  }

  // Change completed state of a Todo to false and update the Todo.
  updateTodo1(id: number, completed: boolean, name: string, createdOn: any): void {
    const title = name + this.attrCategory;
    this.uncompleteTodo = {
                          title: title,
                          completed: completed,
                          id: id,
                          createdOn: createdOn
    };
    const form = JSON.stringify(this.uncompleteTodo);
    this.todoService.updateTodo(form).subscribe(
      response => {
        this.currentTodo = response;
      }
    );
  }

  // Update Todo and set doUpdate to false for disabling Submit on the view.
  updateTodo2(id: number, completed: boolean, title: string, createdOn: any): void {
    this.doUpdate = false; // Can't do updates with set to false;
    this.updateTodo1(id, completed, title, createdOn);
  }

  // Mark the Todo as completed.
  completeTodo(todo): void {
    let todoId = todo.id;
    this.todoService.completeTodo(todoId).subscribe(
      response => {
        this.currentTodo.completed = response.completed;
      }
    )
  }

  // If the Update button is clicked
  update(): void{
    this.doUpdate = true; // set Update on
  }

  getName(title: string): string {
    const startOfDelineator = title.indexOf('&*(');
    if (startOfDelineator !== -1) {
        return title.substring(0, startOfDelineator);
    } else {
        return title;
    }
  }

  getDelineatorPlusCategory(title: string): string {
    const startOfDelineator = title.indexOf('&*(');
    if (startOfDelineator !== -1 && title.substring(startOfDelineator).length >= 4) {
        return title.substring(startOfDelineator);
    } else {
        return 'General';
    }
  }

  ngOnInit(): void {
  }
}
