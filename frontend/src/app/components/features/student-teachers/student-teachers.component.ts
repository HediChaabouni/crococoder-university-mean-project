import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/user';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-student-teachers',
  templateUrl: './student-teachers.component.html',
  styleUrls: ['./student-teachers.component.css']
})
export class StudentTeachersComponent implements OnInit {

    teachers: User[] = [];
    loading = false;
    errorMsg = '';

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    // Get the currently logged-in student
    const student = this.userService.getCurrentUser();
    if (!student || student.role !== 'student') {
      this.errorMsg = 'No student connected.';
      return;
  }
// Fetch teachers for the student
this.loading = true;
    this.userService.getTeachersByStudent(student._id).subscribe({
      next: (data) => (this.teachers = data),
      error: (err) =>
        (this.errorMsg = err.error?.message || 'Failed to load teachers'),
      complete: () => (this.loading = false)
    });

}





}
