import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Users } from '../models/users';
import { environment } from 'src/environments/environment';

const base_url = environment.BASE_URL;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  // TO GET USER 
  get() {
    return this.http.get<Users[]>(`${base_url}`);
  }

  // TO CREATE USER 
  create(payload: Users) {
    return this.http.post<Users>(`${base_url}`, payload);
  }

  // TO UPDATE USER 
  update(payload: Users) {
    return this.http.put<Users>(
      `${base_url}/${payload.id}`,
      payload
    );
  }

  // TO DELETE USER 
  delete(id: number) {
    return this.http.delete(`${base_url}/${id}`);
  }

}
