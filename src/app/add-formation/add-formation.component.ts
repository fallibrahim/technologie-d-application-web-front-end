import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormationService } from '../services/formation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-formation',
  standalone: false,
  templateUrl: './add-formation.component.html',
  styleUrl: './add-formation.component.css'
})
export class AddFormationComponent implements OnInit {
  form!: FormGroup;
  constructor(
    private fb : FormBuilder,
    private formationService : FormationService,
    private router : Router
  ){}

  ngOnInit() : void {
    this.form = this.fb.group({
      titre : ['', Validators.required],
      description : ['', Validators.required],
      niveau : ['', Validators.required]
    });
  }

  onSubmit() : void {
    if(this.form.valid) {
      this.formationService.createFormation(this.form.value).subscribe({
        next: (formationAjoutee) => {
          this.router.navigate(['/admin/formations/', formationAjoutee.id]);
          console.log('Formation ajoutée avec succès', formationAjoutee);
        },
        error: err => console.error('Erreur ajout formation', err)
       });
     }
   }

   navigateToEtudiants(): void {
    this.router.navigate(['admin/formations']);
  }
    
  }
  


