import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Etudiant } from '../models/etudiant';
import { EtudiantService } from '../services/etudiant.service';

@Component({
  selector: 'app-etudiant-details',
  standalone: false,
  templateUrl: './etudiant-details.component.html',
  styleUrl: './etudiant-details.component.css'
})
export class EtudiantDetailsComponent {

  etudiant!: Etudiant;

  constructor(
    private route: ActivatedRoute,
    private etudiantService: EtudiantService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.etudiantService.getEtudiantById(id).subscribe({
      next: (data) => this.etudiant = data,
      error: (err) => console.error("Erreur lors du chargement de l'étudiant", err),
      complete: () => console.log("Chargement de l'étudiant terminé")
    });
  }
  
  deleteEtudiant(): void {
    if (confirm("Êtes-vous sûr de vouloir supprimer cet étudiant ?")) {
      this.etudiantService.deleteEtudiant(this.etudiant.id!).subscribe({
        next: () => this.router.navigate(['/admin/etudiants']),
        error: (err) => console.error("Erreur lors de la suppression", err)
      });
    }
  }
  
  editEtudiant(): void {
    this.router.navigate(['/admin/etudiants/edit', this.etudiant.id]);
  }
}
