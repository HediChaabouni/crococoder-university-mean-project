import { Component, OnInit } from '@angular/core';
import { Eval } from 'src/app/core/models/eval';
import { EvalService } from 'src/app/core/services/eval.service';

@Component({
  selector: 'app-parent-evals',
  templateUrl: './parent-evals.component.html'
})
export class ParentEvalsComponent implements OnInit {
  evals: Eval[] = [];
  errorMsg = '';
  loading = false;

  constructor(private evalService: EvalService) {}

  ngOnInit(): void {
    const parentId = localStorage.getItem('userId');
    if (!parentId) {
      this.errorMsg = 'No parent connected.';
      return;
    }

    this.loading = true;
    // Endpoint côté BE : GET /api/evals/parent/:parentId
    this.evalService.getEvalsByParent(parentId).subscribe({
      next: (data) => (this.evals = data),
      error: (err) => (this.errorMsg = err.error?.message || 'Failed to load evaluations'),
      complete: () => (this.loading = false)
    });
  }
}

