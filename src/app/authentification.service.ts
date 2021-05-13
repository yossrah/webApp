import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import{environment} from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  constructor(private http:HttpClient ) { }
  registerUser(client:any){
    return this.http.post(`${environment.baseUrl}/client/addClient`,client)
     }
  loginUser(user:any){
    return this.http.post(`${environment.baseUrl}/user/login`,user)
  }
  // loginUser(user:any){
  //     return this.http.post(`${environment.baseUrl}/client/login`,user)
  //   }
    logged(){
      return !!localStorage.getItem('access_token')
    }
}
