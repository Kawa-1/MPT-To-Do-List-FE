import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private cookieService: CookieService, private httpClient: HttpClient) {}

  setToken(token:any):void {
    this.cookieService.set('Token', token);
  }

  setRole(role:string):void {
    this.cookieService.set('Role', role);
  }

  getRole():string {
    return this.cookieService.get('Role');
  }

  getToken():string {
    return this.cookieService.get('Token');
  }

  createAuthHeader():HttpHeaders {
    let header = new HttpHeaders({
      "Content-Type": "Application/json",
      "Authorization": `Bearer ${this.getToken()}`
    });
    return header;
  }

  async checkIsLogged(): Promise<boolean> {
    return new Promise((resolve) => {
      this.httpClient.get<any>(URL + '/auth/validate', {params: new HttpParams().set("token", this.cookieService.get('Token'))
      }).subscribe({
        next: () => resolve(true),
        error: () => {
          resolve(false);
        }
      });
    });
  }

  logout(): void {
    this.cookieService.delete('Token');
  }
}

const URL: string = 'http://localhost:8090';
