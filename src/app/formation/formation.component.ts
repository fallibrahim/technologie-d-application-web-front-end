import { Component, OnInit } from '@angular/core';
import { Formation } from '../models/formation';
import { FormationService } from '../services/formation.service';

@Component({
  selector: 'app-formation',
  standalone: false,
  templateUrl: './formation.component.html',
  styleUrl: './formation.component.css'
})
export class FormationComponent implements OnInit{
  formations : Formation[] = [];

  constructor(private formationService : FormationService) {

  }
  ngOnInit(): void {
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
  

}
