import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Users } from '../models/users';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  // TO GET USER 
  get() {
    return this.http.get<Users[]>('http://localhost:3000/userData');
  }

  // TO CREATE USER 
  create(payload: Users) {
    return this.http.post<Users>('http://localhost:3000/userData', payload);
  }

  // TO UPDATE USER 
  update(payload: Users) {
    return this.http.put<Users>(
      `http://localhost:3000/userData/${payload.id}`,
      payload
    );
    }

    // TO DELETE USER 
    delete(id: number) {
      return this.http.delete(`http://localhost:3000/userData/${id}`);
    }

}
