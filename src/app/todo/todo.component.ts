import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TodoService } from '../services/todo-service.service';

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

  currentId: string;
  constructor(private route: ActivatedRoute, private todoService: TodoService) {
  }

  getTodo(currentId): void {
    this.todoService.getTodo(currentId).subscribe(
      response => {
        this.currentTodo = response;
      }
    );
  }

  ngOnInit(): void {
    this.currentId = this.route.snapshot.paramMap.get('id');
    this.getTodo(this.currentId);
  }
}
