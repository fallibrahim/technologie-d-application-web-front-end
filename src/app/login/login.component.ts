import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  hide = true;
  email: string = '';
  motDePasse: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    if (!this.email || !this.motDePasse) {
      this.errorMessage = "Veuillez remplir tous les champs.";
      return;
    }
    this.authService.login({ email: this.email, motDePasse: this.motDePasse }).subscribe({
      next: (response) => {
        this.authService.saveToken(response.token);
  
        const decoded = this.authService.getDecodedToken();
        console.log("🎫 Token décodé :", decoded);
  
        const role = this.authService.getRole();
        console.log("🧑‍💼 Rôle extrait :", role); 
  
        if (role === 'ADMIN') {
          this.router.navigate(['/admin/dashboard']);
        } else if (role === 'ETUDIANT') {
          this.router.navigate(['/etudiant/dashboard']);
        } else {
          this.router.navigate(['/unauthorized']);
        }
      },
      error: (err) => {
        this.errorMessage = "l'email ou le mot de passe est incorrect.";
        console.error('Login error:', err);
      }
    });
  }
  
}
