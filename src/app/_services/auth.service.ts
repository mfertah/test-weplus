import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

const AUTH_API = 'https://test1.quadra-informatique.fr/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private router: Router) { }

  login(login: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'login', {
      login,
      password
    }, httpOptions);
  }

  signOut(): void {
    window.sessionStorage.clear();
    this.router.navigate(['home/login']);
  }

}