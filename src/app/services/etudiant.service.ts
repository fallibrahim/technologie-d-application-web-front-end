import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Etudiant } from '../models/etudiant';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class EtudiantService {
  private baseUrl  = `${environment.etudiantServiceHost}/api/etudiants`;

  constructor(private http : HttpClient) { }

  getEtudiants() : Observable<Etudiant[]>{
   
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<Etudiant[]>(this.baseUrl, { headers });
  }
  getEtudiantById(id: number): Observable<Etudiant> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<Etudiant>(`${this.baseUrl}/${id}`, { headers });
  }

  addEtudiant(etudiant: Etudiant): Observable<Etudiant> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.post<Etudiant>(this.baseUrl, etudiant, { headers });
  }

  updateEtudiant(id: number, etudiant: Etudiant): Observable<Etudiant> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put<Etudiant>(`${this.baseUrl}/${id}`, etudiant, { headers });
  }
  
  deleteEtudiant(id: number): Observable<void> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete<void>(`${this.baseUrl}/${id}`, { headers });
  }
  
  getEtudiantByIne(ine: string): Observable<Etudiant> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<Etudiant>(`${this.baseUrl}?ine=${ine}`, { headers });
  }
  
  
}
