import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.backendHost}/api/auth`;
  private tokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(this.getToken());
  private currentUserRoleSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(this.getRoleFromToken());

  constructor(private http: HttpClient, private router: Router) {}

  login(credentials: { email: string; motDePasse: string }): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, credentials);
  }

  register(data: { nom: string; email: string; motDePasse: string; role: string }): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/register`, data);
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
    this.tokenSubject.next(token);
    this.currentUserRoleSubject.next(this.getRoleFromToken());  
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getDecodedToken(): any | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const payload = token.split('.')[1];
      return JSON.parse(atob(payload));
    } catch (error) {
      return null; 
    }
  }

  getCurrentUser(): any {
    return this.getDecodedToken(); 
  }
  
  getUser(): any {
    const token = localStorage.getItem('token');
    if (!token) return null;
  
    const payload = JSON.parse(atob(token.split('.')[1]));
    return {
      email: payload.sub,
      role: payload.role,
      nom: payload.nom
    };
  }
  

  getRole(): string {
    return this.currentUserRoleSubject.value ?? ''; 
  }

  private getRoleFromToken(): string {
    const decoded = this.getDecodedToken();
    return decoded?.role || '';  
  }

  setRole(role: string): void {
    this.currentUserRoleSubject.next(role);
  }

  getEmail(): string | null {
    const decoded = this.getDecodedToken();
    return decoded?.sub || null;
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;

    const decoded = this.getDecodedToken();
    if (!decoded) return false;

    const expiry = decoded?.exp ? decoded.exp * 1000 : 0;
    if (expiry < Date.now()) {
      this.logout();
      return false;
    }
    return true;
  }

  logout(): void {
    localStorage.removeItem('token');
    this.tokenSubject.next(null);
    this.currentUserRoleSubject.next(null); 
    this.router.navigate(['/login']);
  }

  getTokenObservable(): Observable<string | null> {
    return this.tokenSubject.asObservable();
  }

  getRoleObservable(): Observable<string | null> {
    return this.currentUserRoleSubject.asObservable();  
  }
}
