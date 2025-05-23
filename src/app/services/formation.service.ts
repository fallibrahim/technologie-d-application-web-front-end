import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Formation } from '../models/formation';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FormationService {

  private baseUrl = `${environment.formationServiceHost}/api/formations`;

  constructor(private http: HttpClient) { }

  getFormations(): Observable<Formation[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<Formation[]>(this.baseUrl, { headers });
  }

  getFormationById(id: string): Observable<Formation> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<Formation>(`${this.baseUrl}/${id}`, { headers });
}
  
    createFormation(formation: Formation): Observable<Formation> {
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      return this.http.post<Formation>(this.baseUrl, formation, { headers });
    }
  
    updateFormation(id: string, formation: Formation): Observable<Formation> {
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      return this.http.put<Formation>(`${this.baseUrl}/${id}`, formation, { headers });
    }
  
    deleteFormation(id: string): Observable<void> {
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      return this.http.delete<void>(`${this.baseUrl}/${id}`, { headers });
    }
}
