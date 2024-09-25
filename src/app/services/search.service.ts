import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


const target_url = environment.endPoint;


@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) { }


  search(term: any): Observable<any> {
    return this.http.get<any>(target_url + 'search', { params: { term } });
  }

}
