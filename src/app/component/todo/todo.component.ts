import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/app/models/todo';
import { TodoService } from 'src/app/service/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
})
export class TodoComponent implements OnInit {
  btn: String = 'Add';
  item: String = '';
 todos: Todo[] = [];
  editId: number = 0;
  val: String = '';
  constructor(
    private todoservice: TodoService,
    private httpclient: HttpClient
  ) {}

  ngOnInit(): void {
    this.todoservice.fetchdata().subscribe({
      next: (todos: Todo[]) => (this.todos = todos),
      error: (err) => console.log('error', err),
      complete: () => console.log('completed'),
    });
  }

  addTodo() {
    let itemnew:Todo ={item:this.item};
    this.todoservice.getPostMethod(itemnew).subscribe(response => console.log(response));
  }
  ondelete(deleteid: any): void {
    this.todoservice.deleteItems(deleteid).subscribe({
      next: (items: Todo[]) => {
         this.todos= items;
      },
      complete: () => {},
      error: (error: Error) => {
        console.log('Message:', error.message);
        console.log('Name:', error.name);
      },
    });
  }

  onedit(editid: any): void {
    this.todoservice.findItem(editid).subscribe({
      next: (val: Todo) => {
        this.val = val.item;
        this.item = this.val;
        // console.log(this.item);
        this.btn = 'Edit';
        this.editId = editid;
      },
      complete: () => {},
      error: (error: Error) => {
        console.log('Message:', error.message);
        console.log('Name:', error.name);
      },
    });
}
}
