import { Component, OnInit } from '@angular/core';
import { Eval } from 'src/app/core/models/eval';
import { EvalService } from 'src/app/core/services/eval.service';

@Component({
  selector: 'app-evals',
  templateUrl: './evals.component.html',
  styleUrls: ['./evals.component.css']
})
export class EvalsComponent implements OnInit {

  evals: Eval[] = [];

  constructor(private evalService: EvalService) { }

  ngOnInit(): void {
    this.evalService.getEvals().subscribe({
      next: (data) => {
        console.log('✅ Evals reçues :', data);
        this.evals = data;
      },
      error: (err) => console.error('❌ Erreur API :', err)
    });
  }

}
