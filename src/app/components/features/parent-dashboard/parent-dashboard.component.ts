import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-parent-dashboard',
  templateUrl: './parent-dashboard.component.html',
  styleUrls: ['./parent-dashboard.component.css']
})
export class ParentDashboardComponent implements OnInit {

  notLoggedIn = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    const user = this.userService.getCurrentUser?.() || JSON.parse(localStorage.getItem('user') || 'null');
    this.notLoggedIn = !user || user.role !== 'parent';
  }
}

