import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormationService } from '../services/formation.service';

@Component({
  selector: 'app-edit-formation',
  standalone: false,
  templateUrl: './edit-formation.component.html',
  styleUrl: './edit-formation.component.css'
})
export class EditFormationComponent implements OnInit {
 form!: FormGroup;
  formationId!: string;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private formationService: FormationService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.formationId = this.route.snapshot.paramMap.get('id')!;
    this.formationService.getFormationById(this.formationId).subscribe(data => {
      this.form = this.fb.group({
        titre: [data.titre, Validators.required],
        description: [data.description, Validators.required],
        niveau: [data.niveau, Validators.required]
      });
    });
  }
  onSubmit(): void {
    if (this.form.valid) {
      this.formationService.updateFormation(this.formationId, this.form.value).subscribe({
        next: () => this.router.navigate(['/admin/formations']),
        error: (err) => console.error("Erreur lors de la mise à jour", err)
      });
    }
  }
  goToDetailFormation(): void {
    this.router.navigate(['/admin/formations', this.formationId]);
  }
}
