import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EtudiantService } from '../services/etudiant.service';

@Component({
  selector: 'app-add-etudiant',
  standalone: false,
  templateUrl: './add-etudiant.component.html',
  styleUrls: ['./add-etudiant.component.css']
})
export class AddEtudiantComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private etudiantService: EtudiantService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      ine: ['', Validators.required],
      dateNaissance: ['', Validators.required],
      formation: ['', Validators.required],
      promo: ['', Validators.required],
      anneeDebut: [null, Validators.required],
      anneeSortie: [null, Validators.required],
      diplomes: [''],
      autresFormations: ['']
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.etudiantService.addEtudiant(this.form.value).subscribe({
        next: (etudiantAjoute) => {
          this.router.navigate(['/admin/etudiants/', etudiantAjoute.id]);
          console.log('Etudiant ajouté avec succès', etudiantAjoute);
      },
        error: err => console.error('Erreur ajout étudiant', err)
      });
    }
  }

  navigateToEtudiants(): void {
    this.router.navigate(['admin/etudiants']);
  }
}

