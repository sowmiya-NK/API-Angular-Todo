import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '../models/todo';
import { HttpClient, HttpRequest } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor(private httpClient: HttpClient) {}

  fetchdata(): Observable<Todo[]> {
    return this.httpClient.get<Todo[]>('http://localhost:8080/todo/all');
  }

  getPostMethod(itemnew : Todo):Observable<Todo[]>{
    return this.httpClient.post<Todo[]>('http://localhost:8080/todo',itemnew);
  }

  updateItems(item: Todo): Observable<Todo[]> {
    return this.httpClient.put<Todo[]>(
      'http://localhost:8080/todoapi/updateitem',
      item
    );
  }
 
  deleteTodo(id:number) : Observable<Todo[]>{
    return this.httpClient.delete<Todo[]>('http://localhost:8080/todoapi/deleteitem/'+id);
  }
 
  findTodo(id:number) : Observable<Todo>{
    return this.httpClient.get<Todo>('http://localhost:8080/todoapi/getitem/'+id);
  }
 
 
  addOrEditItems(itemnew: String, editId: number): Observable<Todo[]> {
    return new Observable((observer) => {
      if (itemnew !== '') {
        if (editId === 0) {
          let item: Todo = { item: itemnew };
          this.getPostMethod(item).subscribe({
            next: (data: Todo[]) => {
              observer.next(data);
            },
          });
        } else {
          let item: Todo = { id: editId ,item: itemnew };
          // console.log(item);
          this.updateItems(item).subscribe({
            next: (data: Todo[]) => {
              observer.next(data);
            },
          });
        }
      }
    });
  }
 
 
  deleteItems(id:number) : Observable<Todo[]>
  {
    return new Observable((observer)=>{
      this.deleteTodo(id).subscribe({
        next:(data:Todo[])=>{
          observer.next(data);
        }
      })
    });
  }
 
  findItem(id:number) : Observable<Todo>
  {
    return new Observable((observer)=>{
      this.findTodo(id).subscribe({
        next:(data:Todo)=>{
          observer.next(data);
        }
      })
    });
  }
}
