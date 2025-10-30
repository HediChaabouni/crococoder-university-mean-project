import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = localStorage.getItem('token'); // ⚡ récupère le token de l'utilisateur connecté
    const user = localStorage.getItem('user'); // ⚡ récupère l'utilisateur connecté
    if (user && token) {
      return true; // connecté → accès autorisé
    }

    // pas connecté → rediriger vers login
    return this.router.parseUrl('/login');
  }

}


