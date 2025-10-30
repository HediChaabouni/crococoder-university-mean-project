import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';

// 👇 déclaration globale de jQuery pour TypeScript
declare var $: any;

@Component({
  selector: 'app-hero-banner',
  templateUrl: './hero-banner.component.html',
  styleUrls: ['./hero-banner.component.css']
})
export class HeroBannerComponent implements OnInit, AfterViewInit {

  role: string | null = null;
  isDashboardRoute = false; // ✅ variable pour masquer le bouton

  constructor(
    public userService: UserService, // rendu public pour utiliser dans le template
    private router: Router
  ) { }

  ngOnInit(): void {
    // ✅ Récupère le rôle avec la méthode getUserRole()
    this.role = this.userService.getUserRole();

    // ✅ Écoute les changements de route
    this.router.events.subscribe(() => {
      const currentUrl = this.router.url;
      // ✅ détecte si on est sur un dashboard
      this.isDashboardRoute = currentUrl.includes('dashboard');
    });

  }

  ngAfterViewInit(): void {
    // Initialise tous les dropdowns Bootstrap après le rendu du DOM
    setTimeout(() => {
      ($('.dropdown-toggle') as any).dropdown();
    }, 0);
  }

  logout(): void {
    this.userService.logout();
    this.router.navigate(['/login']);
  }

}


