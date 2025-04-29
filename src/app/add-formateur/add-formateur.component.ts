import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormateurService } from '../services/formateur.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-formateur',
  standalone: false,
  templateUrl: './add-formateur.component.html',
  styleUrl: './add-formateur.component.css'
})
export class AddFormateurComponent  implements OnInit {
  form! : FormGroup;
  constructor(private formateurService : FormateurService, private router : Router,
     private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nom : ['', Validators.required],
      prenom : ['', Validators.required],
      email : ['', [Validators.required, Validators.email]],
      specialite : ['', Validators.required],
    })  
  }
  onSubmit() : void {
    if(this.form.valid) {
      this.formateurService.addFormateur(this.form.value).subscribe({
        next: (formateurAjoute) => {
          this.router.navigate(['/admin/formateurs/', formateurAjoute.id]);
          console.log('Formateur ajouté avec succès', formateurAjoute);
        },
        error: err => console.error('Erreur ajout formateur', err)
      })
    }
  }
}
