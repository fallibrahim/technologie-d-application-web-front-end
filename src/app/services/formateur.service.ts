import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Formateur } from '../models/formateur';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormateurService {
private baseUrl = `${environment.formateurServieHost}/api/formateurs`;
  constructor(private http : HttpClient) { }
  getFormateurs() : Observable<Formateur[]> {
    const token = localStorage.getItem('token');

    const headers =  new HttpHeaders({
      'Authorization' : `Bearer ${token}`
    });
    return this.http.get<Formateur[]>(this.baseUrl, {headers})
  }
}
