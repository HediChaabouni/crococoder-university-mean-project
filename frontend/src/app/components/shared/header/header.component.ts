import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  userName: string = '';
  userPhoto: string = '';

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.loadUser();

    // ✅ Écoute la déconnexion (logout)
    window.addEventListener('user-logout', this.clearUser.bind(this));

    // ✅ Écoute les changements du localStorage (ex: autre onglet)
    window.addEventListener('storage', this.syncUser.bind(this));
  }

  ngOnDestroy(): void {
    window.removeEventListener('user-logout', this.clearUser.bind(this));
    window.removeEventListener('storage', this.syncUser.bind(this));
  }

  /** 🔹 Charge les infos utilisateur depuis localStorage */
  private loadUser(): void {
    const user = this.userService.getCurrentUser?.() || JSON.parse(localStorage.getItem('user') || 'null');
    if (user) {
      this.userName = `${user.firstName} ${user.lastName}`;
      this.userPhoto = user.teacherPhoto
        ? `${environment.apiBaseUrl.replace('/api', '')}/${user.teacherPhoto}`
        : user.studentPhoto
          ? `${environment.apiBaseUrl.replace('/api', '')}/${user.studentPhoto}`
          : 'assets/images/BirdTeamLogo.png';
    } else {
      this.clearUser();
    }
  }

  /** 🔹 Efface le nom et la photo */
  private clearUser(): void {
    this.userName = '';
    this.userPhoto = '';
  }

  /** 🔹 Synchronise quand le localStorage change */
  private syncUser(): void {
    this.loadUser();
  }
}
