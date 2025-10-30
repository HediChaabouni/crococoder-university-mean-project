import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userUrl = `${environment.apiBaseUrl}/users`;

  constructor(private http: HttpClient, private router: Router) { }

  // Crée un nouvel utilisateur
  createUser(user: FormData, role: string): Observable<User> {
    return this.http.post<User>(`${this.userUrl}/signup-${role}`, user);
  }

  // Login : envoie email + password, reçoit token + user
  loginUser(credentials: { email: string; password: string }) {
    return this.http.post<any>(`${this.userUrl}/login`, credentials);
  }

  // Déconnexion : supprime le token et redirige vers login
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // ✅ Notifie le reste de l’app (comme le header)
    window.dispatchEvent(new Event('user-logout'));
    // redirige vers la page de login
    this.router.navigate(['/login']);
  }

  // Vérifie si l'utilisateur est connecté
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token'); // true si un token existe
  }

  // Récupère le rôle de l'utilisateur connecté
  getUserRole(): string | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user).role : null;
  }

  // Récupére ts les users
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.userUrl);
  }

  // Récupére un user par son id
  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${this.userUrl}/${id}`);
  }

  // Générique : récupère les users par rôle ou tous
  getUsersByRole(role?: 'teacher' | 'student' | 'parent' | 'admin'): Observable<User[]> {
    const url = role ? `${this.userUrl}/role/${role}` : `${this.userUrl}`;
    return this.http.get<User[]>(url);
  }

  // Récupère les students d’un teacher
  getStudentsByTeacher(teacherId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.userUrl}/teacher/${teacherId}/students`);
  }

  getChildrenByParent(parentId: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.userUrl}/parent/${parentId}/children`);
  }

  // Met à jour un user
  updateUser(id: string, data: FormData | User): Observable<User> {
    return this.http.put<User>(`${this.userUrl}/${id}`, data);
  }

  // Supprime un user
  deleteUser(id: string): Observable<any> {
    return this.http.delete(`${this.userUrl}/${id}`);
  }

  // Supprimer tous users :
  deleteAllUsers(): Observable<any> {
    return this.http.delete(this.userUrl);
  }

  /** ✅ Recherche d’un enfant par nom complet OU par téléphone */
  searchChild(query: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.userUrl}/search-child?query=${query}`);
  }

  // ✅ Récupère l’utilisateur connecté depuis le localStorage
  getCurrentUser(): any | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  // ✅ Récupère le prénom et nom de l’utilisateur connecté
  getCurrentUserName(): string {
    const user = this.getCurrentUser();
    return user ? `${user.firstName} ${user.lastName}` : '';
  }

}
