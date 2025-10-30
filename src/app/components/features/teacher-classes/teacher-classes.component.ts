import { Component, OnInit } from '@angular/core';
import { ClassService } from 'src/app/core/services/class.service';
import { Class } from 'src/app/core/models/class';

@Component({
  selector: 'app-teacher-classes',
  templateUrl: './teacher-classes.component.html'
})
export class TeacherClassesComponent implements OnInit {
  classes: Class[] = [];
  loading = false;

  constructor(private classService: ClassService) {}

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    if (user?._id) {
      this.loading = true;
      this.classService.getClassesByTeacher(user._id).subscribe({
        next: (res) => this.classes = res,
        error: (err) => console.error('❌ Error loading classes:', err),
        complete: () => this.loading = false
      });
    }
  }
}

