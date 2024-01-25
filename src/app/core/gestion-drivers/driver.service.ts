import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Driver } from './driver';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DriverService {
  baseApi = "http://localhost:8081/driver";
  constructor(private _http:HttpClient) { }
  getDrivers():Observable<Driver[]> {
    return this._http.get<Driver[]>(this.baseApi)
    }
  saveDriver(Driver:Driver){
    console.log(Driver);
    
    return this._http.post<Driver>(this.baseApi,Driver);
  }
}
