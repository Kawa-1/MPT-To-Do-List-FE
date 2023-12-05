import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private cookieService: CookieService, private httpClient: HttpClient) {}

  setToken(token:any):void{
    this.cookieService.set('Token', token.jwt);
  }

  async checkIsLogged(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      let queryParams = new HttpParams();
      queryParams.append('token', this.cookieService.get('Token'));
      console.log(this.cookieService.get('Token'));
      this.httpClient.get<boolean>(URL + '/auth/validate', {params: queryParams
      }).subscribe({
        next: () => resolve(true),
        error: () => {
          resolve(true);
          // resolve(false); //tu trzeba wyjebać linijkę poprzednią a odkomentować tą
        }
      });
    });
  }

  logout(): void {
    this.cookieService.delete('Token');
  }
}

const URL: string = 'http://localhost:8090';
