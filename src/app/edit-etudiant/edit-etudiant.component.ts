import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EtudiantService } from '../services/etudiant.service';

@Component({
  selector: 'app-edit-etudiant',
  standalone: false,
  templateUrl: './edit-etudiant.component.html',
  styleUrl: './edit-etudiant.component.css'
})
export class EditEtudiantComponent {

  form!: FormGroup;
  etudiantId!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private etudiantService: EtudiantService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.etudiantId = Number(this.route.snapshot.paramMap.get('id'));

    this.etudiantService.getEtudiantById(this.etudiantId).subscribe(data => {
      this.form = this.fb.group({
        nom: [data.nom, Validators.required],
        prenom: [data.prenom, Validators.required],
        email: [data.email, [Validators.required, Validators.email]],
        ine: [data.ine, Validators.required],
        dateNaissance: [data.dateNaissance, Validators.required],
        formation: [data.formation, Validators.required],
        promo: [data.promo, Validators.required],
        anneeDebut: [data.anneeDebut, Validators.required],
        anneeSortie: [data.anneeSortie, Validators.required],
        diplomes: [data.diplomes, Validators.required],
        autresFormations: [data.autresFormations]
      });
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.etudiantService.updateEtudiant(this.etudiantId, this.form.value).subscribe({
        next: () => this.router.navigate(['/admin/etudiants']),
        error: (err) => console.error("Erreur lors de la mise à jour", err)
      });
    }
  }
  navigateToEtudiants() {
    this.router.navigate(['/admin/etudiants']);
  }
}
