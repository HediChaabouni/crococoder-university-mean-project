import { Component, OnInit } from '@angular/core';
import { Class } from 'src/app/core/models/class';
import { User } from 'src/app/core/models/user';
import { ClassService } from 'src/app/core/services/class.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-student-class',
  templateUrl: './student-class.component.html'
})
export class StudentClassComponent implements OnInit {
  myClass?: Class;
  classMates: User[] = [];
  loading = false;
  errorMsg = '';

  constructor(
    private classService: ClassService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const student = this.userService.getCurrentUser();
    if (!student || student.role !== 'student') {
      this.errorMsg = 'No student connected.';
      return;
    }
    
    this.loading = true;
    // Endpoint côté BE: GET /api/students/:id/class  → { class: {...}, classmates: [...] }
    this.classService.getClassByStudent(student._id).subscribe({
      next: (res: any) => {
        this.myClass = res.class;
        this.classMates = res.classmates || [];
      },
      error: (err) => (this.errorMsg = err.error?.message || 'Failed to load class'),
      complete: () => (this.loading = false)
    });
  }
}
