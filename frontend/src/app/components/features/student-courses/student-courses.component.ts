import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/core/models/course';
import { CourseService } from 'src/app/core/services/course.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-student-courses',
  templateUrl: './student-courses.component.html'
})
export class StudentCoursesComponent implements OnInit {
  courses: Course[] = [];
  loading = false;
  errorMsg = '';

  constructor(private userService: UserService, private courseService: CourseService) {}

  ngOnInit(): void {
    const student = this.userService.getCurrentUser();
    if (!student || student.role !== 'student') {
      this.errorMsg = 'No student connected.';
      return;
    }

    this.loading = true;
    this.courseService.getCoursesByStudent(student._id).subscribe({
      next: (data) => (this.courses = data),
      error: (err) =>
        (this.errorMsg = err.error?.message || 'Failed to load courses'),
      complete: () => (this.loading = false)
    });
  }

}

