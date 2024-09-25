import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenStorageService } from './services/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerGuard implements CanActivate {
  constructor( private router: Router,private storage:TokenStorageService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const requiredRole = 'ROLE_CUSTOMER';
  
    
    const user = this.storage.getUser();
  
    
    if (user && user.roles.includes(requiredRole)) {
      return true;
    }
  
   
    this.router.navigate(['/error']);
    return false;
  }
  

}
