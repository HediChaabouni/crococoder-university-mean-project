import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { User } from 'src/app/core/models/user';

@Component({
  selector: 'app-teacher-students',
  templateUrl: './teacher-students.component.html'
})
export class TeacherStudentsComponent implements OnInit {
  students: User[] = [];
  loading = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    if (user?._id) {
      this.loading = true;
      this.userService.getStudentsByTeacher(user._id).subscribe({
        next: (res) => this.students = res,
        error: (err) => console.error('❌ Error loading students:', err),
        complete: () => this.loading = false
      });
    }
  }
}

