import { Component, OnInit } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { Todo } from '../_interfaces/todo';
import { User } from '../_interfaces/user';
import { AuthService } from '../_services/auth.service';
import { CrudService } from '../_services/crud.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(
    private tokenStorage: TokenStorageService,
    private crudService: CrudService,
    private authService: AuthService
  ) { }

  currentUser!: User;
  todoLabel!: string | undefined;
  todosStore!: Observable<Todo[]>;
  action: string = 'create';
  idToUpdate!: number | null;
  todoUpdateLabel!: string | null;
  isChecked!: boolean;
  erreur: string = 'Une erreur est survenue';

  ngOnInit(): void {
    this.currentUser = this.tokenStorage.getUser();
    this.refreshList();
  }

  refreshList() {
    this.todosStore = this.crudService.getList();
  }

  async create(todoLabel: string | undefined) {
    let taskBody = {
      todo_label: todoLabel,
      todo_is_done: 0
    }

    try {
      let newTodo = await firstValueFrom(this.crudService.setTodo(taskBody));
      if (newTodo == null) {
        throw this.erreur
      } else {
        this.clearForm();
        this.refreshList()
      }

    } catch (error) {
      console.error(error);
    }

  }

  async update(taskBody: Todo, refresh = true) {
    try {
      let newTodo = await firstValueFrom(this.crudService.updateTodo(taskBody));
      if (newTodo == null) {
        throw this.erreur
      } else {
        this.clearForm();
        if (refresh) {
          this.refreshList()
        }
      }

    } catch (error) {
      console.error(error);
    }
  }

  async updateLabel(id: number, isDone: boolean | undefined) {
    let taskBody: Todo | any = {
      todo_id: id,
      todo_label: this.todoUpdateLabel
    }

    this.update(taskBody);
  }

  async delete(id: number) {

    try {
      let newTodo = await firstValueFrom(this.crudService.deleteTodo(id));
      if (newTodo) {
        this.refreshList()
      } else {
        throw this.erreur
      }

    } catch (error) {
      console.error(error);
    }

  }

  changeIsDone(id: number, label: string, event: any) {
    let taskBody: Todo | any = {
      todo_id: id,
      todo_is_done: event.target.checked
    }

    this.update(taskBody, false);
  }

  clearForm() {
    this.todoLabel = undefined;
    this.todoUpdateLabel = null;
    this.idToUpdate = null;
  }

  showUpdate(todo_id: number, todo_label: string) {
    this.todoUpdateLabel = todo_label;
    this.idToUpdate = todo_id;
  }

  signOut(): void {
    this.authService.signOut()

  }

}
