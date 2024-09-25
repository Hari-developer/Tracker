import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
const target_url = environment.endPoint;

@Injectable({
  providedIn: 'root'
})
export class LeadService {

  constructor(private http: HttpClient) { }


  public getAllLeads(): Observable<any> {
    return this.http.get(target_url + 'user/getAllLeads ');
  }

  public getAllEmployees(): Observable<any> {
    return this.http.get(target_url + 'user/getAllEmployees ');
  }

  public selectLead(leadId:any): Observable<any> {
    return this.http.get(target_url + 'user/getByLeadId/'+leadId);
  }

  public getEmployeeById(employeeId:any): Observable<any> {
    return this.http.get(target_url + 'user/getEmployeeById/'+employeeId);
  }

  public getLeadById(LeadId:any): Observable<any> {
    return this.http.get(target_url + 'user/getLeadById/'+LeadId);
  }

  public getLeadData(LeadId:any): Observable<any> {
    return this.http.get(target_url + 'user/getLeadData/'+LeadId);
  }


  public getAllApps(): Observable<any> {
    return this.http.get(target_url+'get/getAllApp');
  }

  public getEmployeeByOneDriveUpdate(id: any) : Observable<any>{
    return this.http.get(target_url+'user/getEmployeeById/'+id);
  }

  public getLeadByOneDriveUpdate(id: any) : Observable<any>{
    return this.http.get(target_url+'onedriveUpdateLead/'+id);
  }
  
  public saveEmployeeOneDriveLink(id: any, oneDriveLink: any): Observable<any> {
    const requestBody = {
        id: id,
        oneDriveLink: oneDriveLink
    };
    return this.http.post(target_url + 'user/onedriveLink', requestBody);
}

public saveLeadOneDriveLink(id: any, oneDriveLink: any): Observable<any> {
  const requestBody = {
      id: id,
      oneDriveLink: oneDriveLink
  };
  return this.http.post(target_url + 'user/onedriveLinkLead', requestBody);
}

public getAllTrackers(): Observable<any> {
  return this.http.get(target_url+'tracker/getAllTrackers');
}

}
