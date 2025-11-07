import { Component, OnInit } from '@angular/core';
import { Eval } from 'src/app/core/models/eval';
import { EvalService } from 'src/app/core/services/eval.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-parent-evals',
  templateUrl: './parent-evals.component.html'
})
export class ParentEvalsComponent implements OnInit {
  evals: Eval[] = [];
  errorMsg = '';
  loading = false;

  constructor(
    private evalService: EvalService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const parent = this.userService.getCurrentUser();
    if (!parent || parent.role !== 'parent') {
      this.errorMsg = 'No parent connected.';
      return;
    }

    this.loading = true;
    this.evalService.getEvalsByParent(parent._id).subscribe({
      next: (data) => (this.evals = data),
      error: (err) =>
        (this.errorMsg = err.error?.message || 'Failed to load evaluations'),
      complete: () => (this.loading = false)
    });
  }
}


