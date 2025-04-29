import { Component, OnInit } from '@angular/core';
import { Formation } from '../models/formation';
import { FormationService } from '../services/formation.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-formation',
  standalone: false,
  templateUrl: './formation.component.html',
  styleUrl: './formation.component.css'
})
export class FormationComponent implements OnInit{
  formations : Formation[] = [];
  isAdmin : boolean = false;
  isEtudiant : boolean = false;
   private roleSubscription!: Subscription;
  constructor(private formationService : FormationService,private router: Router, private authService: AuthService) { 
    this.formationService = formationService;

  }
  ngOnInit(): void {
    this.roleSubscription = this.authService.getRoleObservable().subscribe(role => {
      this.isAdmin = role === 'ADMIN';
      this.isEtudiant = role === 'ETUDIANT';
    });
    this.formationService.getFormations().subscribe({
      next: (data) => {
        this.formations = data;
        console.log(this.formations);
      },
      error: (error) => {
        console.error('Error fetching formations:', error.error.message);
        alert('Erreur lors de la récupération des formations. Veuillez réessayer plus tard.');
      }
    })
    
  }
  
   goToFormationDetails(formation : Formation): void {
    this.router.navigateByUrl(`/admin/formations/${formation.id}`);
   }
}
