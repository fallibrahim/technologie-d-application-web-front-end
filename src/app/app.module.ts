import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminTemplateComponent } from './admin-template/admin-template.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { FormationComponent } from './formation/formation.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { FormateurComponent } from './formateur/formateur.component';
import { EtudiantsComponent } from './etudiants/etudiants.component';
import { DocumentsComponent } from './documents/documents.component';
import { InsertionComponent } from './insertion/insertion.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { RouterOutlet } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { JwtInterceptor } from './interceptors/jwt-interceptor.service';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { EtudiantDetailsComponent } from './etudiant-details/etudiant-details.component';
import { EditEtudiantComponent } from './edit-etudiant/edit-etudiant.component';
import { AddEtudiantComponent } from './add-etudiant/add-etudiant.component';
import { DetailFormationComponent } from './detail-formation/detail-formation.component';
import { AddFormationComponent } from './add-formation/add-formation.component';
import { EditFormationComponent } from './edit-formation/edit-formation.component';
import { DetailFormateurComponent } from './detail-formateur/detail-formateur.component';
import { AddFormateurComponent } from './add-formateur/add-formateur.component';
import { EditFormateurComponent } from './edit-formateur/edit-formateur.component';


@NgModule({
  declarations: [
    AppComponent,
    AdminTemplateComponent,
    DashboardComponent,
    HomeComponent,
    FormationComponent,
    ProfileComponent,
    LoginComponent,
    FormateurComponent,
    EtudiantsComponent,
    DocumentsComponent,
    InsertionComponent,
    AboutComponent,
    ContactComponent,
    UnauthorizedComponent,
    EtudiantDetailsComponent,
    EditEtudiantComponent,
    AddEtudiantComponent,
    DetailFormationComponent,
    AddFormationComponent,
    EditFormationComponent,
    DetailFormateurComponent,
    AddFormateurComponent,
    EditFormateurComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    HttpClientModule,
    MatListModule,
    MatListModule,
    MatIconModule,
    FormsModule
    
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
