import { Component, OnInit } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  userName: string= '';
  email: string= '';
  ngOnInit(): void {
   const token = localStorage.getItem('token');
       if (token) {
         const decodedToken: any = jwtDecode(token);
         this.userName = decodedToken.nom;
          this.email = decodedToken.sub;
       }
  }

}
