import { Component, OnInit } from '@angular/core';
import { Formateur } from '../models/formateur';
import { FormateurService } from '../services/formateur.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { Router } from '@angular/router';

@Component({
  selector: 'app-formateur',
  standalone: false,
  templateUrl: './formateur.component.html',
  styleUrl: './formateur.component.css'
})
export class FormateurComponent implements OnInit {
  formateurs : Formateur[] = [];
   private roleSubscription!: Subscription;

  constructor(private formateurService : FormateurService,private router : Router) { }

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

  gotoFormateurDetails(formateur : Formateur): void {
     this.router.navigateByUrl(`/admin/formateurs/${formateur.id}`);
  }
  
}
