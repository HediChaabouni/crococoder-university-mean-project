import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/core/services/admin.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  constructor(private adminService: AdminService) { }

stats = { teachers: 0, students: 0, courses: 0, classes: 0 };

ngOnInit(): void {
  // Appelle ton AdminService pour récupérer les stats globales
  this.adminService.getDashboardStats().subscribe({
    next: res => this.stats = res,
    error: () => console.warn('Stats not loaded')
  });
}

}
