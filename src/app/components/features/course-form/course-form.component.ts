// // course-form.component.ts
// import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Course } from 'src/app/core/models/course';

// @Component({
//   selector: 'app-course-form',
//   templateUrl: './course-form.component.html'
// })
// export class CourseFormComponent implements OnChanges {

//   @Input() course: Course | null = null;
//   @Output() saveCourse = new EventEmitter<Course>();

//   courseForm: FormGroup;

//   constructor(private fb: FormBuilder) {
//     this.courseForm = this.fb.group({
//       title: ['', Validators.required],
//       description: ['', Validators.required],
//       classId: [''] // optionnel : lier à une classe
//     });
//   }

//   ngOnChanges(changes: SimpleChanges): void {
//     if (changes['course'] && this.course) {
//       this.courseForm.patchValue(this.course);
//     }
//   }

//   submit(): void {
//     if (this.courseForm.valid) {
//       this.saveCourse.emit(this.courseForm.value);
//       this.courseForm.reset();
//     }
//   }
// }

import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Course } from 'src/app/core/models/course';

@Component({
selector: 'app-course-form',
templateUrl: './course-form.component.html',
styleUrls: ['./course-form.component.css']})

export class CourseFormComponent implements OnInit {

  @Input() course: Course | null = null;
  @Output() saveCourse = new EventEmitter<Course>();

  localCourse: Course = {
    courseTitle: '',
    courseLevel: '',
    courseDescription: '',
    courseImageUrl: ''
  };

  ngOnInit(): void {
    if (this.course) {
      this.localCourse = { ...this.course };
    }
  }

  onSaveCourse(): void {
    if (!this.localCourse.courseTitle || !this.localCourse.courseLevel || !this.localCourse.courseDescription) {
      return;
    }
    this.saveCourse.emit(this.localCourse);
  }
}

