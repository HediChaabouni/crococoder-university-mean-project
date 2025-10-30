import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Eval } from 'src/app/core/models/eval';

@Component({
  selector: 'app-eval-form',
  templateUrl: './eval-form.component.html'
})

export class EvalFormComponent implements OnChanges {

  @Input() evalData: Eval | null = null;
  @Output() saveEval = new EventEmitter<Eval>();

  evalForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.evalForm = this.fb.group({
      evalNote: ['', Validators.required],
      evalComment: ['', Validators.required],
      evalStatus: [true, Validators.required],
      studentId: ['', Validators.required],
      courseId: ['', Validators.required],
      classId: ['', Validators.required]
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['evalData'] && this.evalData) {
      this.evalForm.patchValue(this.evalData);
    } else if (changes['evalData'] && !this.evalData) {
      this.evalForm.reset({ evalStatus: true });
    }
  }

  submit(): void {
    if (this.evalForm.valid) {
      this.saveEval.emit(this.evalForm.value);
      this.evalForm.reset({ evalStatus: true });
    }
  }
}
