import { Component, OnInit } from '@angular/core';
import { Eval } from 'src/app/core/models/eval';
import { EvalService } from 'src/app/core/services/eval.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-teacher-evals',
  templateUrl: './teacher-evals.component.html'
})
export class TeacherEvalsComponent implements OnInit {

  evals: Eval[] = [];
  selectedEval: Eval | null = null;
  msg = '';
  teacherId = '';

  constructor(
    private evalService: EvalService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    const teacher = this.userService.getCurrentUser() || JSON.parse(localStorage.getItem('user') || 'null');
    if (!teacher?._id) {
      this.msg = '⚠️ No teacher connected';
      return;
    }
    this.teacherId = teacher._id;
    console.log('✅ Teacher chargé:', teacher);
    this.loadMyEvals();
  }

  /** ✅ Charger les évaluations du teacher */
  loadMyEvals(): void {
    this.evalService.getEvalsByTeacher(this.teacherId).subscribe({
      next: (data) => {
        this.evals = data.sort(
          (a, b) => new Date(b.createdAt || '').getTime() - new Date(a.createdAt || '').getTime()
        );
        console.log('✅ Evals loaded & sorted for teacher:', this.teacherId, this.evals);
      },
      error: (err) => {
        this.msg = '❌ Error loading evals';
        console.error(err);
      }
    });
  }

  /** ✅ Ajouter une évaluation */
  onAddEval(evalData: Eval): void {
    const payload = { ...evalData, teacherId: this.teacherId };
    console.log('📤 Payload envoyé au backend:', payload);

    this.evalService.createEval(payload).subscribe({
      next: () => {
        this.msg = '✅ Évaluation créée avec succès';
        this.loadMyEvals();
      },
      error: (err) => {
        console.error('❌ Erreur création évaluation:', err);
        this.msg = '❌ Error creating evaluation';
      }
    });
  }

  /** ✅ Mettre à jour une évaluation */
  onUpdate(evalData: Eval): void {
    if (!this.selectedEval?._id) return;

    this.evalService.updateEval(this.selectedEval._id, evalData).subscribe({
      next: () => {
        this.msg = '✅ Évaluation mise à jour';
        this.loadMyEvals();
        this.selectedEval = null;
      },
      error: (err) => {
        console.error('❌ Erreur mise à jour évaluation:', err);
        this.msg = '❌ Error updating evaluation';
      }
    });
  }
}

// import { Component, OnInit } from '@angular/core';
// import { Eval } from 'src/app/core/models/eval';
// import { EvalService } from 'src/app/core/services/eval.service';
// import { UserService } from 'src/app/core/services/user.service';

// @Component({
//   selector: 'app-teacher-evals',
//   templateUrl: './teacher-evals.component.html'
// })
// export class TeacherEvalsComponent implements OnInit {

//   evals: Eval[] = [];
//   selectedEval: Eval | null = null;
//   msg = '';

//   constructor(
//     private evalService: EvalService,
//     private userService: UserService
//   ) { }

//   ngOnInit(): void {
//     const teacher = this.userService.getCurrentUser?.() || JSON.parse(localStorage.getItem('user') || 'null');
//     if (!teacher || !teacher._id) {
//       this.msg = '⚠️ No teacher connected';
//       return;
//     }
//     console.log('✅ Teacher chargé:', teacher);
//     this.loadMyEvals(teacher._id);
//   }

//   // ✅ Charger les évaluations du teacher
//   loadMyEvals(teacherId: string): void {
//     this.evalService.getEvalsByTeacher(teacherId).subscribe({
//       next: (data) => {
//         // ✅ Tri des évaluations du plus récent au plus ancien
//         this.evals = data.sort(
//           (a, b) =>
//             new Date(b.createdAt || '').getTime() -
//             new Date(a.createdAt || '').getTime()
//         );
//         console.log('✅ Evals loaded & sorted for teacher:', teacherId, this.evals);
//       },
//       error: (err) => {
//         this.msg = '❌ Error loading evals';
//         console.error(err);
//       }
//     });
//   }

//   // ✅ Ajouter une évaluation
//   onAddEval(evalData: Eval): void {
//     const teacher = JSON.parse(localStorage.getItem('user') || 'null');
//     if (!teacher?._id) return;

//     const payload = { ...evalData, teacherId: teacher._id };
//     console.log('📤 Payload envoyé au backend:', payload);

//     this.evalService.createEval(payload).subscribe({
//       next: () => {
//         this.msg = '✅ Évaluation créée avec succès';
//         this.loadMyEvals(teacher._id);
//       },
//       error: (err) => {
//         console.error('❌ Erreur création évaluation:', err);
//         this.msg = '❌ Error creating evaluation';
//       }
//     });
//   }
//   // ✅ Mettre à jour une évaluation
//   onUpdate(evalData: Eval): void {
//     if (!this.selectedEval?._id) return;
//     this.evalService.updateEval(this.selectedEval._id, evalData).subscribe({
//       next: () => {
//         this.msg = '✅ Évaluation mise à jour';
//         const teacher = JSON.parse(localStorage.getItem('user') || 'null');
//         this.loadMyEvals(teacher._id);
//         this.selectedEval = null;
//       },
//       error: (err) => {
//         console.error('❌ Erreur mise à jour évaluation:', err);
//         this.msg = '❌ Error updating evaluation';
//       }
//     });
//   }

// }
