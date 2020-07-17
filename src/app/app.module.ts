import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
//import { WelcomeComponent } from './welcome/welcome.component';
import { AppComponent } from './app.component';
import { TodoService } from './services/todo-service.service';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoComponent } from './todo/todo.component';


@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    TodoComponent

  ],
  imports: [
    BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule, HttpClientModule,

    RouterModule.forRoot([
      {path: '', component: TodoListComponent},
      {path: 'todo/:id', component: TodoComponent},
      //{path: '', redirectTo: 'superheroes', pathMatch: 'full'}
      {path: '**', redirectTo: ''}
    ])
  ],
  providers: [TodoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
