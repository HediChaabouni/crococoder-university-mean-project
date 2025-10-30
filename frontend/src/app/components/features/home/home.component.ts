import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/core/services/admin.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  stats = { teachers: 0, students: 0, courses: 0, classes: 0 };

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.loadStats();
  }
  
  // Fetch dashboard stats
  loadStats(): void {
    this.adminService.getDashboardStats().subscribe({
      next: (data) => this.stats = data,               // ✅ quand la donnée arrive
      error: (err) => console.error('Erreur :', err),  // ❌ en cas d’erreur
      complete: () => console.log('Flux terminé ✅')    // 🏁 à la fin du flux
    });
  }


}
