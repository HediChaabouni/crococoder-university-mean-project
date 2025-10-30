import { Component, OnInit } from '@angular/core';
import { User } from '../../../core/models/user';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: User[] = [];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  console.log('📌 UsersComponent initialized');
  this.userService.getUsers().subscribe({
    next: (data) => {
      console.log('✅ Data reçue:', data);
      this.users = data;
    },
    error: (err) => console.error('❌ Erreur chargement Users:', err)
  });
}

}
