import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { CourseService } from 'src/app/core/services/course.service';
import { EvalService } from 'src/app/core/services/eval.service';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent implements OnInit {

  notLoggedIn = false;
  stats = {
    courses: 0,
    class: false,
    evals: 0,
    teachers: 0
  };

  constructor(
    private userService: UserService,
    private courseService: CourseService,
    private evalService: EvalService
  ) {}

  ngOnInit(): void {
    const user = this.userService.getCurrentUser?.() || JSON.parse(localStorage.getItem('user') || 'null');

    // 🔹 Vérifie l'accès
    if (!user || user.role !== 'student') {
      this.notLoggedIn = true;
      return;
    }

    // 🔹 Charge les stats de base depuis le front
    this.loadStats(user._id);
  }

  /** Charge les stats du dashboard étudiant */
  private loadStats(studentId: string): void {
    // 🟦 Courses
    this.courseService.getCoursesByStudent(studentId).subscribe({
      next: (courses) => {
        this.stats.courses = courses.length;
    // 🟨 Teachers liés à ces cours
        const teachers = new Set(
          courses.flatMap((c: any) => c.teacherIds || [])
        );
        this.stats.teachers = teachers.size;
      },
      error: (err) => console.error('❌ Error loading student courses:', err)
    });

    // 🟦 Evaluations
    this.evalService.getEvalsByStudent(studentId).subscribe({
      next: (evals) => (this.stats.evals = evals.length),
      error: (err) => console.error('❌ Error loading student evals:', err)
    });

    // 🟩 Class
    const user = this.userService.getCurrentUser?.() || JSON.parse(localStorage.getItem('user') || 'null');
    this.stats.class = !!(user?.classIds && user.classIds.length > 0);
  }
}

