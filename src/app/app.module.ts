import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoService } from './services/todo-service.service';


@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
  ],
  imports: [
    BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule, HttpClientModule
  ],
  providers: [TodoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
