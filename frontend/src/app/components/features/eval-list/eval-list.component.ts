import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Eval } from 'src/app/core/models/eval';

@Component({
  selector: 'app-eval-list',
  templateUrl: './eval-list.component.html'
})
export class EvalListComponent {

  @Input() evals: Eval[] = [];
  @Output() editEval = new EventEmitter<Eval>();
  @Output() deleteEval = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

}
