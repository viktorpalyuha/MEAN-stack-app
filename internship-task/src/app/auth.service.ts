import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

import { Form } from './shared/models/form.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  token: any;
  user: Form;

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {}

  signUpUser(user: Form): Observable<object> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post('sign-up', user, { headers });
  }

  signInUser(user: Form): Observable<object> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post('sign-in', user, { headers });
  }

  storeUser(token: string, user: Form): void {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.token = token;
    this.user = user;
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');

    return !this.jwtHelper.isTokenExpired(token);
  }
}
