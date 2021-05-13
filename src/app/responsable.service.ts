import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environment} from 'src/environments/environment'
@Injectable({
  providedIn: 'root'
})
export class ResponsableService {

  constructor(private http:HttpClient) { }
  registerRespo(restaurateur:any){
    return this.http.post(`${environment.baseUrl}/restaurateur/register`,restaurateur)
     }
  loginUser(restaurateur:any){
      return this.http.post(`${environment.baseUrl}/restaurateur/login`,restaurateur)
    }
}
