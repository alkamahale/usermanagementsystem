import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

interface UserResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: User[];
}
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://reqres.in/api/users';
  constructor(private http:HttpClient) { }

  getUsers(page: number = 1): Observable<UserResponse> {
    return this.http.get<UserResponse>(`https://reqres.in/api/users?page=${page}`);
  }

  getUserById(id: number): Observable<any> {
    return this.http.get(`https://reqres.in/api/users/${id}`);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`https://reqres.in/api/users/${id}`);
  }

  addUser(user: any): Observable<any> {
    return this.http.post(this.apiUrl, user);
  }

  updateUser(id: number, user: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, user);
  }
}
