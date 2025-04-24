import { Component, OnInit } from '@angular/core';
import { Formateur } from '../models/formateur';
import { FormateurService } from '../services/formateur.service';

@Component({
  selector: 'app-formateur',
  standalone: false,
  templateUrl: './formateur.component.html',
  styleUrl: './formateur.component.css'
})
export class FormateurComponent implements OnInit {
  formateurs : Formateur[] = [];

  constructor(private formateurService : FormateurService) { }

  ngOnInit(): void {
    this.formateurService.getFormateurs().subscribe({
      next: (data) => {
        this.formateurs = data;
      },
      error: (err) => {
        console.error('Error fetching formateurs', err);
      },
      complete: () => {
        console.log('Formateurs fetched successfully');
      }
    })
  }
  
}
