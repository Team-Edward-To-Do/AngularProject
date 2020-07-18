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
  doUpdate: boolean;
  doSubmit : boolean;

  constructor(private route: ActivatedRoute, private todoService: TodoService) {
    this.doUpdate = false;
    this.doSubmit = false;
  }

  getTodo(currentId): void {
    this.todoService.getTodo(currentId).subscribe(
      response => {
        this.currentTodo = response;
      }
    );
  }

  updateTodo(id: number, completed: boolean, title: string, createdOn: any): void {
    this.uncompleteTodo = {
                          title: title,
                          completed: completed,
                          id: id,
                          createdOn: createdOn
    };
    let form = JSON.stringify(this.uncompleteTodo);
    this.todoService.updateTodo(form).subscribe(
      response => {
        this.currentTodo.completed = response.completed;
        console.log("updateTodo : completed - " + this.currentTodo.completed);
      }
    );
    this.doSubmit = false;
  }
  
  completeTodo(todo): void {
    let todoId = todo.id;
    this.todoService.completeTodo(todoId).subscribe(
      response => {
        this.currentTodo.completed = response.completed;
        console.log("completeTodo : completed - " + this.currentTodo.completed);
      }
    )
  }

  update(): void{
    this.doUpdate = true;
  }

  ngOnInit(): void {
    this.currentId = this.route.snapshot.paramMap.get('id');
    this.getTodo(this.currentId);
  }
}
