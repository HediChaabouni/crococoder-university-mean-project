import { Component, OnInit } from '@angular/core';
import { Testimonial } from 'src/app/core/models/testimonial';
import { TestimonialService } from 'src/app/core/services/testimonial.service';

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.css']
})
export class TestimonialsComponent implements OnInit {

 testimonials: Testimonial[] = [];

  constructor(private testimonialService: TestimonialService) {}

  ngOnInit(): void {
    this.testimonialService.getAll().subscribe(data => {
      this.testimonials = data;
    });
  }

}
