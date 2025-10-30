import { Component, OnInit } from '@angular/core';
import { Eval } from 'src/app/core/models/eval';
import { EvalService } from 'src/app/core/services/eval.service';

@Component({
  selector: 'app-student-evals',
  templateUrl: './student-evals.component.html'
})
export class StudentEvalsComponent implements OnInit {
  evals: Eval[] = [];
  loading = false;
  errorMsg = '';

  constructor(private evalService: EvalService) {}

  ngOnInit(): void {
    const studentId = localStorage.getItem('userId');
    if (!studentId) {
      this.errorMsg = 'No student connected.';
      return;
    }
    this.loading = true;
    this.evalService.getEvalsByStudent(studentId).subscribe({
      next: (data) => (this.evals = data),
      error: (err) => (this.errorMsg = err.error?.message || 'Failed to load evaluations'),
      complete: () => (this.loading = false)
    });
  }
}

