// import { Component, OnInit } from '@angular/core';
// import { CourseService } from 'src/app/core/services/course.service';
// import { Course } from 'src/app/core/models/course';
// import { UserService } from 'src/app/core/services/user.service';

// @Component({
//   selector: 'app-teacher-courses-list',
//   templateUrl: './teacher-courses-list.component.html'
// })
// export class TeacherCoursesListComponent implements OnInit {
//   courses: Course[] = [];
//   teacherId!: string;
//   loading = false;
//   msg = '';

//   constructor(
//     private courseService: CourseService,
//     private userService: UserService
//   ) {}

//   ngOnInit(): void {
//     const teacher = this.userService.getCurrentUser() || JSON.parse(localStorage.getItem('user')!);
//     if (!teacher?._id) {
//       this.msg = '⚠️ No teacher connected';
//       return;
//     }

//     this.teacherId = teacher._id;
//     this.loadCourses();
//   }

//   loadCourses(): void {
//     this.loading = true;
//     this.courseService.getCoursesByTeacher(this.teacherId).subscribe({
//       next: (res) => {
//         this.courses = res;
//         this.loading = false;
//       },
//       error: (err) => {
//         this.msg = '❌ Error loading courses';
//         this.loading = false;
//         console.error(err);
//       }
//     });
//   }
// }

import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/core/services/course.service';
import { Course } from 'src/app/core/models/course';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-teacher-courses-list',
  templateUrl: './teacher-courses-list.component.html'
})
export class TeacherCoursesListComponent implements OnInit {
  courses: Course[] = [];
  teacherId!: string;
  loading = false;
  msg = '';

  constructor(
    private courseService: CourseService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const teacher = this.userService.getCurrentUser() || JSON.parse(localStorage.getItem('user')!);
    if (!teacher?._id) {
      this.msg = '⚠️ No teacher connected';
      return;
    }

    this.teacherId = teacher._id;
    this.loadCourses();
  }

  loadCourses(): void {
    this.loading = true;
    this.courseService.getCoursesByTeacher(this.teacherId).subscribe({
      next: (res) => {
        this.courses = res;
        this.loading = false;
      },
      error: (err) => {
        this.msg = '❌ Error loading courses';
        this.loading = false;
        console.error(err);
      }
    });
  }

  // ✅ Editer un cours
  onEdit(course: Course): void {
    this.courseService.setCourseToEdit(course); // sauvegarde temporaire
    window.location.href = '/teacher-dashboard/add-courses'; // redirection
  }

  // ✅ Supprimer un cours
  onDelete(courseId: string): void {
    if (!confirm('⚠️ Delete this course?')) return;
    this.courseService.deleteCourse(courseId).subscribe({
      next: () => {
        this.msg = '✅ Course deleted';
        this.loadCourses();
      },
      error: (err) => {
        console.error('❌ Error deleting course:', err);
        this.msg = '❌ Error deleting course';
      }
    });
  }
}
