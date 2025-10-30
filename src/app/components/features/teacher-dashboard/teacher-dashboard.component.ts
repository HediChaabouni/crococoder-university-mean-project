import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
import { CourseService } from 'src/app/core/services/course.service';
import { EvalService } from 'src/app/core/services/eval.service';
import { ClassService } from 'src/app/core/services/class.service';

@Component({
  selector: 'app-teacher-dashboard',
  templateUrl: './teacher-dashboard.component.html',
  styleUrls: ['./teacher-dashboard.component.css']
})
export class TeacherDashboardComponent implements OnInit {

  teacher: any;
  notValidated = false;

  stats = {
    myCourses: 0,
    myEvals: 0,
    myStudents: 0,
    myClasses: 0
  };

  constructor(
    private userService: UserService,
    private courseService: CourseService,
    private evalService: EvalService,
    private classService: ClassService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // 🔹 Récupération de l’utilisateur connecté
    this.teacher = this.userService.getCurrentUser() || JSON.parse(localStorage.getItem('user') || 'null');

    if (!this.teacher) {
      this.router.navigate(['/login']);
      return;
    }

    if (!this.teacher.teacherValidated) {
      this.notValidated = true;
      return;
    }

    console.log('✅ Teacher chargé:', this.teacher);
    this.loadTeacherStats();
  }

  /** 🔹 Charge toutes les stats du teacher connecté */
  loadTeacherStats(): void {
    const id = this.teacher._id;

    this.courseService.getCoursesByTeacher(id).subscribe({
      next: res => this.stats.myCourses = res.length,
      error: err => console.error('Error loading courses:', err)
    });

    this.evalService.getEvalsByTeacher(id).subscribe({
      next: res => this.stats.myEvals = res.length,
      error: err => console.error('Error loading evals:', err)
    });

    this.userService.getStudentsByTeacher(id).subscribe({
      next: res => this.stats.myStudents = res.length,
      error: err => console.error('Error loading students:', err)
    });

    this.classService.getClassesByTeacher(id).subscribe({
      next: res => this.stats.myClasses = res.length,
      error: err => console.error('Error loading classes:', err)
    });
  }
}

// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { UserService } from 'src/app/core/services/user.service';
// import { CourseService } from 'src/app/core/services/course.service';
// import { EvalService } from 'src/app/core/services/eval.service';
// import { ClassService } from 'src/app/core/services/class.service';

// @Component({
//   selector: 'app-teacher-dashboard',
//   templateUrl: './teacher-dashboard.component.html',
//   styleUrls: ['./teacher-dashboard.component.css']
// })
// export class TeacherDashboardComponent implements OnInit {

//   teacher: any;
//   notValidated = false;

//   stats = {
//     myCourses: 0,
//     myEvals: 0,
//     myStudents: 0,
//     myClasses: 0
//   };

//   constructor(
//     private userService: UserService,
//     private courseService: CourseService,
//     private evalService: EvalService,
//     private classService: ClassService,
//     private router: Router
//   ) {}

//   ngOnInit(): void {
//   // Récupération de l’utilisateur connecté
//   this.teacher = this.userService.getCurrentUser();

//   // Si pas dans le service, vérifie dans le localStorage
//   if (!this.teacher) {
//         const stored = localStorage.getItem('user');
//     if (stored) {
//       this.teacher = JSON.parse(stored);
//     }
//   }

//   // Si toujours pas de teacher, redirige vers login
//   if (!this.teacher) {
//     this.router.navigate(['/login']);
//     return;
//   }

//   // Si Teacher, vérifie s’il est validé
//   if (!this.teacher.teacherValidated) {
//     this.notValidated = true;
//     return;
//   }

//   // Si tout est ok, charge les stats
//   console.log('✅ Teacher chargé:', this.teacher);
//   this.loadTeacherStats();
// }

//   /** 🔹 Charge toutes les stats du teacher connecté */
//   loadTeacherStats(): void {
//     const id = this.teacher._id;

//     this.courseService.getCoursesByTeacher(id).subscribe({
//       next: res => this.stats.myCourses = res.length,
//       error: err => console.error('Error loading courses:', err)
//     });

//     this.evalService.getEvalsByTeacher(id).subscribe({
//       next: res => this.stats.myEvals = res.length,
//       error: err => console.error('Error loading evals:', err)
//     });

//     this.userService.getStudentsByTeacher(id).subscribe({
//       next: res => this.stats.myStudents = res.length,
//       error: err => console.error('Error loading students:', err)
//     });

//     this.classService.getClassesByTeacher(id).subscribe({
//       next: res => this.stats.myClasses = res.length,
//       error: err => console.error('Error loading classes:', err)
//     });
//   }
// }

