import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AdminTemplateComponent } from './admin-template/admin-template.component';
import { ProfileComponent } from './profile/profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EtudiantsComponent } from './etudiants/etudiants.component';
import { FormationComponent } from './formation/formation.component';
import { FormateurComponent } from './formateur/formateur.component';
import { InsertionComponent } from './insertion/insertion.component';
import { DocumentsComponent } from './documents/documents.component';
import { AuthGuard } from './auth.guard';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { EtudiantDetailsComponent } from './etudiant-details/etudiant-details.component';
import { EditEtudiantComponent } from './edit-etudiant/edit-etudiant.component';
import { AddEtudiantComponent } from './add-etudiant/add-etudiant.component';
import { DetailFormationComponent } from './detail-formation/detail-formation.component';
import { AddFormationComponent } from './add-formation/add-formation.component';
import { EditFormationComponent } from './edit-formation/edit-formation.component';
import { DetailFormateurComponent } from './detail-formateur/detail-formateur.component';
import { AddFormateurComponent } from './add-formateur/add-formateur.component';
import { EditFormateurComponent } from './edit-formateur/edit-formateur.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'unauthorized', component: UnauthorizedComponent},
  {
    path: 'admin',
    component: AdminTemplateComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    data: { role: 'ADMIN' },
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'etudiants', component: EtudiantsComponent },
      { path: 'etudiants/add', component: AddEtudiantComponent },
      { path: 'etudiants/:id', component: EtudiantDetailsComponent },
      { path: 'etudiants/edit/:id', component: EditEtudiantComponent },
      { path: 'formateurs', component: FormateurComponent },
      {path : 'formateurs/add', component: AddFormateurComponent},
      {path: 'formateurs/:id', component:  DetailFormateurComponent},
      {path: 'formateurs/edit/:id', component: EditFormateurComponent},
      { path: 'formations', component: FormationComponent },
      {path: 'formations/add', component: AddFormationComponent},
      {path: 'formations/:id', component: DetailFormationComponent},  
      {path: 'formations/edit/:id', component: EditFormationComponent},
      { path: 'documents', component: DocumentsComponent },
      { path: 'insertions', component: InsertionComponent },
      { path: 'profile', component: ProfileComponent }

    ]
  },
  {
    path: 'etudiant',
    component: AdminTemplateComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    data: { role: 'ETUDIANT' },
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'formations', component: FormationComponent },
      { path: 'documents', component: DocumentsComponent },
      { path: 'insertions', component: InsertionComponent },
      { path: 'profile', component: ProfileComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
