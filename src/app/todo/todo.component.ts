import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TodoService } from '../services/todo-service.service';
import { Todo } from '../todo';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  currentTodo = {
    completed: false,
    createdOn: 0,
    id: 0,
    title: ' '
  };

  uncompleteTodo: Todo;
  currentId: string;
  doUpdate: boolean; // Whether to do updates or not. true - update, false - no update

  constructor(private route: ActivatedRoute, private todoService: TodoService) {
    this.doUpdate = false;
  }

  // gets a Todo by it's Id
  getTodo(currentId): void {
    this.todoService.getTodo(currentId).subscribe(
      response => {
        this.currentTodo = response;
      }
    );
  }

  // Change completed state of a Todo to false and update the Todo.
  updateTodo1(id: number, completed: boolean, title: string, createdOn: any): void {
    this.uncompleteTodo = {
                          title: title,
                          completed: completed,
                          id: id,
                          createdOn: createdOn
    };
    let form = JSON.stringify(this.uncompleteTodo);
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

  ngOnInit(): void {
    this.currentId = this.route.snapshot.paramMap.get('id');
    this.getTodo(this.currentId);
  }
}
