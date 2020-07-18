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
    console.log(this.doUpdate);
  }

  getTodo(currentId): void {
    this.todoService.getTodo(currentId).subscribe(
      response => {
        this.currentTodo = response;
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
       // this.getTodos();
      }
    );
  }
  completeTodo(todo): void {
    let todoId = todo.id;
    this.todoService.completeTodo(todoId).subscribe(
      response => {
        console.log(response);
        //this.getTodos();
      }
    )
  }

  update(){
    this.doUpdate = true;
    console.log(this.doUpdate);
  }

  ngOnInit(): void {
    this.currentId = this.route.snapshot.paramMap.get('id');
    this.getTodo(this.currentId);
  }
}
