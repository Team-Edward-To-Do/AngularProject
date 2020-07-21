import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoComponent } from './todo/todo.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { TodoService } from './services/todo-service.service';
import { SharedService } from './services/shared.service';


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
      {path: 'aboutUs', component: AboutUsComponent},
      {path: '**', redirectTo: ''}
    ])
  ],
  providers: [TodoService, SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
