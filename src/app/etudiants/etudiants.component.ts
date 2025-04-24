import { Component, OnInit } from '@angular/core';
import { Etudiant } from '../models/etudiant';
import { EtudiantService } from '../services/etudiant.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-etudiants',
  standalone: false,
  templateUrl: './etudiants.component.html',
  styleUrl: './etudiants.component.css'
})
export class EtudiantsComponent implements OnInit {
 etudiants:Etudiant [] = [];
 ineRecherche: string = '';
 rechercheActive: boolean = false;
 constructor(private etudiantService : EtudiantService, private router : Router) { } 
  ngOnInit(): void {
    this.etudiantService.getEtudiants().subscribe({
      next : (data) => {this.etudiants = data;},
      error : (err) => {console.error('Erreur lors de la récupération des étudiants', err);},
      complete : () => {console.log('Récupération des étudiants terminée');}
    });
    this.chargerTousLesEtudiants();
  }
  
  chargerTousLesEtudiants(): void {
    this.etudiantService.getEtudiants().subscribe({
      next: (data) => {
        this.etudiants = data;
        this.rechercheActive = false;
      },
      error: (err) => console.error('Erreur lors du chargement des étudiants', err)
    });
  }

  rechercherParIne(): void {
    if (!this.ineRecherche.trim()) return;
    this.etudiantService.getEtudiantByIne(this.ineRecherche.trim()).subscribe({
      next: (etudiant) => {
        this.etudiants = [etudiant];
        this.rechercheActive = true;
      },
      error: (err) => {
        console.error('Aucun étudiant trouvé pour cet INE', err);
        this.etudiants = [];
        this.rechercheActive = false;
      }
    });
  }

  resetRecherche(): void {
    this.ineRecherche = '';
    this.chargerTousLesEtudiants();
  }

  onIneChange(value: string): void {
    this.ineRecherche = value.trim();
    if (this.ineRecherche.length >= 2) {
      this.rechercherParIne();
    } else if (this.ineRecherche.length === 0) {
      this.resetRecherche();
    }
  }
  

  goToEtudiantDetails(etudiant:Etudiant) {
    this.router.navigateByUrl(`/admin/etudiants/${etudiant.id}`);

  }
 
}
