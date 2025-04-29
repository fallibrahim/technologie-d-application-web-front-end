import { Component, OnInit } from '@angular/core';
import { Formation } from '../models/formation';
import { ActivatedRoute, Router } from '@angular/router';
import { FormationService } from '../services/formation.service';

@Component({
  selector: 'app-detail-formation',
  standalone: false,
  templateUrl: './detail-formation.component.html',
  styleUrl: './detail-formation.component.css'
})
export class DetailFormationComponent implements OnInit {
  formation!: Formation;
 

  constructor(private route: ActivatedRoute, private formationService: FormationService, private router : Router) {}
    
    ngOnInit() : void {
    const id = this.route.snapshot.paramMap.get('id') ?? '';
    this.formationService.getFormationById(id).subscribe({
      next: (data) => this.formation = data,
      error: (err) => console.error('Erreur lors de la récupération de la formation', err),
      complete: () =>  console.log('Récupération de la formation terminée')});
    }

    editFormation(): void {
      this.router.navigate(['/admin/formations/edit', this.formation.id]);
    }
    
    deleteFormation(): void {
      if (confirm('Êtes-vous sûr de vouloir supprimer cette formation ?')) {
        this.formationService.deleteFormation(this.formation.id!).subscribe({
          next: () => this.router.navigate(['/admin/formations']),
          error: (err) => console.error('Erreur lors de la suppression de la formation', err)
        });
      }
    }
}
