import { Injectable } from '@angular/core';
import { Testimonial } from '../models/testimonial';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestimonialService {

private mockTestimonials: Testimonial[] = [
    {
      id: 1,
      student: 'Alice',
      content: 'This university changed my life! The teachers are amazing.',
      date: '2024-09-12'
    },
    {
      id: 2,
      student: 'Bob',
      content: 'Great courses and a very supportive environment.',
      date: '2024-10-05'
    },
    {
      id: 3,
      student: 'Charlie',
      content: 'I especially loved the Computer Science program.',
      date: '2024-11-20'
    }
  ];

  getAll(): Observable<Testimonial[]> {
    return of(this.mockTestimonials);
  }

  constructor() { }
}
