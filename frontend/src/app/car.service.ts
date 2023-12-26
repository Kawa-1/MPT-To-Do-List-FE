import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private authService: AuthService, private httpClient: HttpClient) { }

  addCar(newCar:Car) {
    newCar.authToken = this.authService.getToken();
    return this.httpClient.post<string>(URL + '/car/add', newCar, {headers: this.authService.createAuthHeader()});
  }

  getAllCars(): Observable<CarDb[]> {
    return this.httpClient.get<CarDb[]>(URL + '/car/all', {headers: this.authService.createAuthHeader(), params: new HttpParams().set('token', this.authService.getToken())});
  }

}

export interface Car {
  authToken: string,
  name: string,
  description: string,
}

export interface CarDb {
  cid: string,
  name: string,
  description: string,
  created: string
}

const URL: string = 'http://localhost:8090';
