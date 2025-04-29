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

  getFormateurById(id: number): Observable<Formateur> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<Formateur>(`${this.baseUrl}/${id}`, { headers });
  }
  addFormateur(formateur: Formateur): Observable<Formateur> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.post<Formateur>(this.baseUrl, formateur, { headers });
  }
  updateFormateur(id: number, formateur: Formateur): Observable<Formateur> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ 
      'Authorization': `Bearer ${token}`
    });
    return this.http.put<Formateur>(`${this.baseUrl}/${id}`, formateur, { headers });
  }

  deleteFormateur(id: number): Observable<void> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete<void>(`${this.baseUrl}/${id}`, { headers });
  }
}
