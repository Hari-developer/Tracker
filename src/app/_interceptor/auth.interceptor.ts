import { HTTP_INTERCEPTORS, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../services/token-storage.service';
   

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;

constructor(private storageService: TokenStorageService) { }
  
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  
   const token = this.storageService.getUser()?.token;
  
 if (token) {
  
 request = request.clone({
  
setHeaders: {
  
   Authorization: `Bearer ${token}`
  }
   });
  
  }
    return next.handle(request);
 }
  
  }

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];