import { Component, OnInit } from '@angular/core';
import { Formateur } from '../models/formateur';
import { ActivatedRoute, Router } from '@angular/router';
import { FormateurService } from '../services/formateur.service';

@Component({
  selector: 'app-detail-formateur',
  standalone: false,
  templateUrl: './detail-formateur.component.html',
  styleUrl: './detail-formateur.component.css'
})
export class DetailFormateurComponent implements OnInit {
  public formateur!:Formateur;

  constructor(private route: ActivatedRoute, private formateurService : FormateurService,
    private router : Router
  ) {}

 ngOnInit(): void {
     const id = Number(this.route.snapshot.paramMap.get('id'));
     this.formateurService.getFormateurById(id).subscribe({
       next : (data) => this.formateur = data,
       error : (err) => console.error('Erreur lors de la récupération du formateur', err),
       complete : () => console.log('Récupération du formateur terminée')
     })
 }

 gotoEditFormateur(): void {
  this.router.navigateByUrl(`/admin/formateurs/edit/${this.formateur.id}`);
 }

 deleteFormateur() : void {
  if (confirm('Êtes-vous sûr de vouloir supprimer ce formateur ?')) {
    this.formateurService.deleteFormateur(this.formateur.id!).subscribe({
      next: () => this.router.navigate(['/admin/formateurs']),
      error: (err) => console.error('Erreur lors de la suppression du formateur', err)
    });
  }
 }

}
