import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import{environment} from 'src/environments/environment'
@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient) { }
  registerAdmin(admin:any){
    return this.http.post(`${environment.baseUrl}/Admin/register`,admin)
     }
  loginAdmin(admin:any){
      return this.http.post(`${environment.baseUrl}/Admin/login`,admin)
    }
}
