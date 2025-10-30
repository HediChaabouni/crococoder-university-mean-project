// course-item.component.ts

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Course } from 'src/app/core/models/course';

@Component({
  selector: 'app-course-item',
  templateUrl: './course-item.component.html',
  styleUrls: ['./course-item.component.css']
})

export class CourseItemComponent {
  @Input() course!: Course;
  @Output() delete = new EventEmitter<string>();
  @Output() edit = new EventEmitter<Course>();

  constructor() { }

  ngOnInit(): void {
  }

}

