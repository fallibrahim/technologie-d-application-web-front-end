import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormateurService } from '../services/formateur.service';

@Component({
  selector: 'app-edit-formateur',
  standalone: false,
  templateUrl: './edit-formateur.component.html',
  styleUrl: './edit-formateur.component.css'
})
export class EditFormateurComponent implements OnInit{
  public form!: FormGroup;
  public formateurId!: number;
  constructor(private formateurService: FormateurService, private router: Router,
    private fb: FormBuilder,private route : ActivatedRoute) {}

    ngOnInit() : void {
      this.formateurId =Number(this.route.snapshot.paramMap.get('id'));
      this.formateurService.getFormateurById(this.formateurId).subscribe({
        next : (data) => {
          this.form = this.fb.group({
            nom : [data.nom, [Validators.required]],
            prenom : [data.prenom, [Validators.required]],
            email : [data.email, [Validators.required, Validators.email]],
            specialite : [data.specialite, [Validators.required]],
          })
        }
      })
    }
    onSubmit() : void {
     this.formateurService.updateFormateur(this.formateurId, this.form.value).subscribe({
      next : (data) => {
        this.router.navigateByUrl('/admin/formateurs');
        console.log('Formateur mis à jour avec succès', data);
      },
      error : (err) => console.error('Erreur lors de la mise à jour du formateur', err),
      complete : () => console.log('Mise à jour du formateur terminée')
     })
    }
}
