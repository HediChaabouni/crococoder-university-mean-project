import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/core/models/course';
import { CourseService } from 'src/app/core/services/course.service';

@Component({
  selector: 'app-student-courses',
  templateUrl: './student-courses.component.html'
})
export class StudentCoursesComponent implements OnInit {
  courses: Course[] = [];
  loading = false;
  errorMsg = '';

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    const studentId = localStorage.getItem('userId');
    if (!studentId) {
      this.errorMsg = 'No student connected.';
      return;
    }
    this.loading = true;
    this.courseService.getCoursesByStudent(studentId).subscribe({
      next: (data) => (this.courses = data),
      error: (err) => (this.errorMsg = err.error?.message || 'Failed to load courses'),
      complete: () => (this.loading = false)
    });
  }
}

