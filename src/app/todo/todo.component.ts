import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { TodoService } from '../services/todo-service.service';
import { Todo } from '../todo';
import { from } from 'rxjs';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  currentTodo: Todo;
  currentId: string;
  //listOfTodos: string;

  //todos = new FormGroup({
  //  title: new FormControl('')
  //});

  constructor(private route: ActivatedRoute, private todoService: TodoService) { }

  getTodoEc2(currentId): void {
    this.todoService.getTodo(currentId).subscribe(
      response => {
        this.currentTodo = response;
      }
    );
  }

  ngOnInit(): void {
    this.currentId = this.route.snapshot.paramMap.get('id');
    this.getTodoEc2(this.currentId);
    console.log(this.currentId);
  }

}
