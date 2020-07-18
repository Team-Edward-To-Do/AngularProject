import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TodoService } from '../services/todo-service.service';
import { SharedService } from '../services/shared.service';
import { Todo } from '../todo';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  currentTodo: Todo;
  currentTodoSelected = false;
  currentId: string;

  constructor(private route: ActivatedRoute, private todoService: TodoService, private sharedService: SharedService) {
    this.currentId = this.route.snapshot.paramMap.get('id');
    if (this.currentId !== 'noTodo') {
      this.getTodo(this.currentId);
      this.currentTodoSelected = true;
    } else {
      this.currentTodoSelected = false;
    }
  }

  getTodo(currentId): void {
    this.todoService.getTodo(currentId).subscribe(
      response => {
        this.currentTodo = response;
      }
    );
  }

  emitActiveTab(activeTab: string): void {
    this.sharedService.emitChange(activeTab);
  }

  ngOnInit(): void {
  }
}
