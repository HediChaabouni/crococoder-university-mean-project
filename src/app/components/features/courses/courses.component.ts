import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/core/models/course';
import { CourseService } from 'src/app/core/services/course.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  courses: Course[] = [];
  loading = false;
  msg = '';

  constructor(private courseService: CourseService) {}

 ngOnInit(): void {
    this.loadCourses();
  }

   /** 🔹 Charge tous les cours depuis la BDD */
  loadCourses(): void {
    this.loading = true;
    this.courseService.getCourses().subscribe({
      next: (data) => {
        this.courses = data || [];
        this.loading = false;
      },
      error: (err) => {
        console.error('❌ Error loading courses:', err);
        this.msg = '❌ Unable to load courses.';
        this.loading = false;
      }
    });
  }

  /** 🔧 Construit une valeur CSS sûre: SafeStyle => background-image */
courseImg(path?: string | null): string {
  if (!path) {
    return "url('/assets/images/course-7.jpg')";
  }

  // Si c’est déjà une URL complète
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return `url('${path}')`;
  }

  // Si c’est une image locale dans assets
  if (path.startsWith('assets/')) {
    return `url('/${path}')`;
  }

  // Fallback
  return "url('/assets/images/course-7.jpg')";
}

}

  // fileUrl(path?: string | null): string {
  //   // 🧱 Cas 1 : rien du tout
  //   if (!path) return 'url("/assets/images/course-7.jpg")'; // ← slash initial pour forcer !

  //   // 🧱 Cas 2 : c’est déjà une URL complète (hébergée ailleurs)
  //   if (path.startsWith('http')) return path;

  //   // 🧱 Cas 3 : c’est une image interne (uploads/…)
  //   const cleanPath = path.replace(/\\/g, '/').replace(/^\/+/, '');
  //   return `${environment.apiBaseUrl.replace(/\/api$/, '')}/${cleanPath}`;
  // }


