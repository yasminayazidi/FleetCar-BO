import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from './car';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  baseApi = "http://localhost:8081/car";
  constructor(private _http:HttpClient) { }
  getCars():Observable<Car[]> {
    return this._http.get<Car[]>(this.baseApi)
    }
  saveCar(car:Car){
    console.log(car);
    
    return this._http.post<Car>(this.baseApi,car);
  }
}
