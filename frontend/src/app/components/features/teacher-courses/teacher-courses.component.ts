// import { Component, OnInit } from '@angular/core';
// import { CourseService } from 'src/app/core/services/course.service';
// import { Course } from 'src/app/core/models/course';
// import { UserService } from 'src/app/core/services/user.service';

// @Component({
//   selector: 'app-teacher-courses',
//   templateUrl: './teacher-courses.component.html',
//   styleUrls: ['./teacher-courses.component.css']
// })
// export class TeacherCoursesComponent implements OnInit {

//   courses: Course[] = [];
//   selectedCourse: Course | null = null;

//   constructor(
//     private courseService: CourseService,
//     private userService: UserService
//   ) { }

//   ngOnInit(): void {
//     this.loadCourses();
//   }

//   loadCourses(): void {
//     // 🔹 Récupérer le teacher connecté depuis le service ou localStorage
//     const teacher = this.userService.getCurrentUser?.() || JSON.parse(localStorage.getItem('user') || 'null');
//     // Vérifier que le teacher est bien défini
//     if (!teacher || !teacher._id) {
//       console.warn('⚠️ Aucun teacher trouvé dans le localStorage');
//       return;
//     }
//     // ✅ Appel backend avec le vrai ID
//     console.log('👨‍🏫 Teacher ID utilisé pour le chargement des cours :', teacher._id);
//     this.courseService.getCoursesByTeacher(teacher._id).subscribe({
//       next: (data) => {
//         this.courses = data;
//         console.log('✅ Courses loaded:', data);
//       },
//       error: (err) => {
//         console.error('❌ Error loading courses', err);
//       }
//     });
//   }

//   onAddCourse(newCourse: Course): void {
//     // 🔹 Récupérer le teacher connecté
//     const teacher = this.userService.getCurrentUser?.() || JSON.parse(localStorage.getItem('user') || 'null');

//     if (!teacher || !teacher._id) {
//       console.warn('⚠️ Aucun teacher trouvé pour l’association du cours.');
//       return;
//     }

//     // 🔹 Injecter automatiquement le teacherId
//     newCourse.teacherIds = [teacher._id];

//     console.log('📤 Envoi depuis le composant:', newCourse);

//     this.courseService.createCourse(newCourse).subscribe({
//       next: res => {
//         console.log('✅ Course created:', res);
//         this.courses.push(res); // mise à jour locale immédiate
//       },
//       error: err => console.error('❌ Error creating course:', err)
//     });
//   }

//   onUpdate(course: Course): void {
//     if (!this.selectedCourse) return;
//     this.courseService.updateCourse(this.selectedCourse._id!, course).subscribe({
//       next: () => {
//         this.selectedCourse = null;
//         this.loadCourses();
//       }
//     });
//   }

//   onDelete(courseId: string): void {
//     this.courseService.deleteCourse(courseId).subscribe({
//       next: () => this.loadCourses()
//     });
//   }

//   onEdit(course: Course): void {
//     this.selectedCourse = { ...course }; // copie locale
//   }
// }

import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/core/services/course.service';
import { Course } from 'src/app/core/models/course';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-teacher-courses',
  templateUrl: './teacher-courses.component.html'
})
export class TeacherCoursesComponent implements OnInit {
  courses: Course[] = [];
  selectedCourse: Course | null = null;

  constructor(
    private courseService: CourseService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const teacher = this.userService.getCurrentUser() || JSON.parse(localStorage.getItem('user')!);
    if (!teacher?._id) return;

    // ✅ Vérifie si un cours est en mode édition
    const courseToEdit = this.courseService.getCourseToEdit();
    if (courseToEdit) {
      this.selectedCourse = courseToEdit;
      console.log('🖊️ Editing course:', this.selectedCourse);
      this.courseService.clearCourseToEdit(); // reset
    }

    // Charge les cours existants du teacher
    this.loadCourses(teacher._id);
  }

  loadCourses(teacherId: string): void {
    this.courseService.getCoursesByTeacher(teacherId).subscribe({
      next: (res) => (this.courses = res),
      error: (err) => console.error('❌ Error loading courses:', err)
    });
  }

  onAddCourse(courseData: Course): void {
    const teacher = JSON.parse(localStorage.getItem('user') || 'null');
    if (!teacher?._id) return;
    const payload = { ...courseData, teacherId: teacher._id };
    this.courseService.createCourse(payload).subscribe({
      next: () => this.loadCourses(teacher._id),
      error: (err) => console.error('❌ Error adding course:', err)
    });
  }

  onUpdate(courseData: Course): void {
    if (!this.selectedCourse?._id) return;
    this.courseService.updateCourse(this.selectedCourse._id, courseData).subscribe({
      next: () => {
        const teacher = JSON.parse(localStorage.getItem('user') || 'null');
        this.loadCourses(teacher._id);
        this.selectedCourse = null;
      },
      error: (err) => console.error('❌ Error updating course:', err)
    });
  }
}




