import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Eval } from 'src/app/core/models/eval';

@Component({
  selector: 'app-eval-item',
  templateUrl: './eval-item.component.html'
})
export class EvalItemComponent {
  @Input() eval!: Eval;
  @Output() edit = new EventEmitter<Eval>();
  @Output() delete = new EventEmitter<string>();

   constructor() { }

  ngOnInit(): void {
  }
}
