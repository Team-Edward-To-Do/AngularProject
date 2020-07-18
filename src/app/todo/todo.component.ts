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
  currentTodo = {completed: false,
    createdOn: 0,
    id: 0,
    title: ' '
  };

  uncompleteTodo: Todo;
  currentId: string;
  doUpdate: boolean;

  constructor(private route: ActivatedRoute, private todoService: TodoService) {
    this.doUpdate = false;
  }

  getTodo(currentId): void {
    this.todoService.getTodo(currentId).subscribe(
      response => {
        this.currentTodo = response;
      }
    );
  }

  updateTodo(id: number, completed: boolean, title: string, createdOn: any): void {
    console.log("Completed + " + completed);
    this.uncompleteTodo = {
                          title: title,
                          completed: completed,
                          id: id,
                          createdOn: createdOn
    };
    let form = JSON.stringify(this.uncompleteTodo);
    this.todoService.updateTodo(form).subscribe(
      response => {
        console.log(response);
        this.uncompleteTodo.completed = response.completed;
        console.log("Completed Response + " + this.uncompleteTodo.completed);
      }
    );
  }
  
  completeTodo(todo): void {
    let todoId = todo.id;
    this.todoService.completeTodo(todoId).subscribe(
      response => {
        console.log(response);
      }
    )
  }

  update(){
    this.doUpdate = true;
  }

  ngOnInit(): void {
    this.currentId = this.route.snapshot.paramMap.get('id');
    this.getTodo(this.currentId);
  }
}
