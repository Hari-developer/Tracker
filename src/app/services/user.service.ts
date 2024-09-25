import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const target_url = environment.endPoint;

@Injectable({
  providedIn: 'root'
})
  
export class UserService  {
  
  constructor(private http: HttpClient) { }


  getAllRoles(): Observable<any> {
    return this.http.get(target_url+'getAllRoles');
  }

  createUser(userData: any):Observable<any> {
   return this.http.post(target_url+'user/create',userData,{ responseType: 'text' });
  }

  saveEmployee(employeeData:any):Observable<any> {
    return this.http.post(target_url+'save/employee',employeeData,{ responseType: 'text' });
   }

  saveLead(userData: any):Observable<any> {
    return this.http.post(target_url+'save/lead',userData,{ responseType: 'text' });
   }
 

public deleteUser(row:any): Observable<any> {
    return this.http.put(target_url + 'user/delete/' + row.id, '');
  }

  public updateuser(useryObj:any): Observable<any> {
    return this.http.put(target_url + 'user/restore/' + useryObj.id, useryObj);
  }

  public getallLeads(): Observable<any> {
    return this.http.get(target_url + 'user/names ');
  }
}