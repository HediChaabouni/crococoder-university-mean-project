// course-list.component.ts

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Course } from 'src/app/core/models/course';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})

export class CourseListComponent {

  @Input() courses: Course[] = [];
  @Output() deleteCourse = new EventEmitter<string>();
  @Output() editCourse = new EventEmitter<Course>();

  constructor() { }

  ngOnInit(): void {
  }

}

