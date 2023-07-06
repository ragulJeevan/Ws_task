import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Users } from '../user/models/users';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  get() {
    return this.http.get<Users[]>('http://localhost:3000/userData');
  }

}
