import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { User } from 'src/app/core/models/user';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css']
})
export class TeachersComponent implements OnInit {
  teachers: User[] = [];
  allTeachers: User[] = [];
  loading = false;
  errorMsg = '';

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.loadTeachers();
  }

  /** 🔹 Charge tous les enseignants validés */
  loadTeachers(): void {
    this.loading = true;
    this.userService.getUsersByRole('teacher').subscribe({
      next: (res: User[]) => {
        const list = res || [];
        this.teachers = list.filter(t => !!t.teacherValidated);
        this.allTeachers = [...this.teachers];
        this.loading = false;
      },
      error: (err) => {
        this.errorMsg = err.error?.message || 'Failed to load teachers';
        this.loading = false;
      }
    });
  }

  /** 🔹 Génère l’URL complète du CV */
  fileUrl(path?: string | null): string | null {
    if (!path) return null;
    const cleanPath = path.replace(/\\/g, '/').replace(/^\/+/, '');
    // Si apiBaseUrl contient déjà /api, on remonte d’un niveau
    return `${environment.apiBaseUrl.replace(/\/api$/, '')}/${cleanPath}`;
  }

  /** 🔹 Recherche par spécialité */
  onSearch(specialty: string): void {
    if (!specialty?.trim()) {
      this.teachers = [...this.allTeachers];
      return;
    }
    const term = specialty.toLowerCase();
    this.teachers = this.allTeachers.filter(t =>
      t.teacherSpecialty?.toLowerCase().includes(term)
    );
  }

  trackById(_i: number, t: User): string {
    return t._id ?? t.email ?? `${t.firstName}-${t.lastName}`;
  }
}



