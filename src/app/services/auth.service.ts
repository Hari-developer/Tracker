import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, of } from 'rxjs';
import { environment } from 'src/environments/environment';



const target_url = environment.endPoint;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

 
  constructor(private http: HttpClient) { }

  login(userEmpId: any, password: any): Observable<any> {
    return this.http.post(target_url + 'api/authenticate/signin', {
      userEmpId,
      password
    }, httpOptions);
  }


  public createuser(userDto:any): Observable<any> {
    return this.http.post(target_url + 'user/create', userDto);
  }

  public getuserrole(): Observable<any> {
    return this.http.get(target_url + 'getrole');
  }


  public getalluser(): Observable<any> {
    return this.http.get(target_url + 'user/getAllUser');
  }

  public updatePassword(oldPassword: any, newPassword: any): Observable<any> {
    const body = {
      oldPassword,
      newPassword
    };
    return this.http.put(target_url + 'user/updatePassword', body, { responseType: 'text' });
  }


  // register(username: string, email: string,mobile :string, password: string): Observable<any> {
  //   return this.http.post(apiUrl + 'api/authenticate/signup', {
  //     username,
  //     email,
  //     mobile,
  //     password
  //   }, httpOptions);
  // }

}

