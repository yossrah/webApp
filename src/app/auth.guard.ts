import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthentificationService } from './authentification.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router:Router,private authser:AuthentificationService){}
  canActivate():boolean {
    {
      if (this.authser.logged()) {
        return true;
      } else {
        this.router.navigate(['']);
        return false;
      }
    }


  }
  
}
