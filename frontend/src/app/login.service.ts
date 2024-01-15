import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private httpClient: HttpClient) {}

  authenticate(login: String, password: String): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(URL + '/auth/login', {
      username: login,
      password: password,
    });
  }

  register(newUser: RegisterWrapper): Observable<any> {
    return this.httpClient.post<string>(URL + '/auth/register', newUser, {headers: HTTP_JSON_APPLICATION_HEADER});
  }
}

export interface RegisterWrapper {
  // clientType: String;
  // clientName: String;
  username: String;
  // clientPhone: String;
  // clientMail: String;
  password: String;
  role: String;
}

export interface AuthResponse {
  jwt: string,
  role: string
}

const URL: string = 'http://34.118.68.231:8090';
const HTTP_JSON_APPLICATION_HEADER:HttpHeaders = new HttpHeaders({
  "Content-Type": "application/json"
});
