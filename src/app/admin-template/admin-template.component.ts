import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-admin-template',
  standalone: false,
  templateUrl: './admin-template.component.html',
  styleUrls: ['./admin-template.component.css']
})
export class AdminTemplateComponent implements OnInit, OnDestroy {
  isAdmin: boolean = false;
  isEtudiant: boolean = false;
  private roleSubscription!: Subscription;
  userName: string = '';
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.roleSubscription = this.authService.getRoleObservable().subscribe(role => {
      this.isAdmin = role === 'ADMIN';
      this.isEtudiant = role === 'ETUDIANT';
    });
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: any = jwtDecode(token);
      this.userName = decodedToken.nom;
    }
  }

  ngOnDestroy(): void {
    if (this.roleSubscription) {
      this.roleSubscription.unsubscribe();
    }
  }
  
  get salutation(): string {
    const heure = new Date().getHours();
    if (heure < 12) return 'Bonjour';
    if (heure < 18) return 'Bon après-midi';
    return 'Bonsoir';
  }
  

  logout() {
    this.authService.logout();
  }
}
