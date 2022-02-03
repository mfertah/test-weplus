import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const API_URL = 'https://test1.quadra-informatique.fr/api/todo/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(private http: HttpClient) { }

  getList<T>(): Observable<T[]> {
    return this.http.get<T[]>(API_URL + 'list', httpOptions);
  }

  setTodo<T>(item: any): Observable<T> {
    return this.http.post<T>(API_URL + '', item, httpOptions);
  }

  deleteTodo<T>(id: number): Observable<T> {
    return this.http.delete<T>(API_URL + id);
  }

  updateTodo<T>(item: any): Observable<T> {
    return this.http.post<T>(API_URL, item, httpOptions);
  }
}
