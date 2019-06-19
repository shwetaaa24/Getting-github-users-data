import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  userUrl = 'https://api.github.com/users';
  repoUrl = '';

  constructor(private http: HttpClient) { }

  getData() {
    return this.http.get(this.userUrl);
  }

  getRepo() {
    return this.http.get(this.repoUrl);
  }
}