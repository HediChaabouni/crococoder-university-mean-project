import { Component, OnInit } from '@angular/core';
import { EvalService } from 'src/app/core/services/eval.service';
import { UserService } from 'src/app/core/services/user.service';
import { Eval } from 'src/app/core/models/eval';

@Component({
  selector: 'app-teacher-evals-list',
  templateUrl: './teacher-evals-list.component.html'
})
export class TeacherEvalsListComponent implements OnInit {
  evals: Eval[] = [];
  teacherId!: string;
  loading = false;
  selectedEval: Eval | null = null;
  msg = '';

  constructor(
    private evalService: EvalService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const teacher = this.userService.getCurrentUser() || JSON.parse(localStorage.getItem('user') || 'null');
    if (!teacher?._id) {
      this.msg = '⚠️ No teacher connected';
      return;
    }

    this.teacherId = teacher._id;
    this.loadMyEvals();
  }

  /** 🔹 Charger toutes les évaluations du teacher */
  loadMyEvals(): void {
    this.loading = true;
    this.evalService.getEvalsByTeacher(this.teacherId).subscribe({
      next: (res) => {
        this.evals = res.sort(
          (a, b) =>
            new Date(b.createdAt || '').getTime() -
            new Date(a.createdAt || '').getTime()
        );
        this.loading = false;
        console.log('✅ Evals loaded for teacher:', this.teacherId, this.evals);
      },
      error: (err) => {
        this.msg = '❌ Error loading evaluations';
        this.loading = false;
        console.error(err);
      }
    });
  }

  /** 🔹 Supprimer une évaluation */
  onDelete(id: string): void {
    if (!confirm('Delete this evaluation?')) return;

    this.evalService.deleteEval(id).subscribe({
      next: () => {
        this.msg = '✅ Évaluation supprimée';
        this.loadMyEvals();
      },
      error: (err) => {
        console.error('❌ Erreur suppression évaluation:', err);
        this.msg = '❌ Error deleting evaluation';
      }
    });
  }

  /** 🔹 Supprimer toutes les évaluations du teacher connecté */
  onDeleteAll(): void {
    if (!confirm('⚠️ Delete ALL your evaluations?')) return;

    this.evalService.deleteAllEvalsByTeacher(this.teacherId).subscribe({
      next: () => {
        this.msg = '✅ Toutes les évaluations ont été supprimées';
        this.evals = [];
      },
      error: (err) => {
        console.error('❌ Erreur suppression évaluations:', err);
        this.msg = '❌ Error deleting all evaluations';
      }
    });
  }

  /** 🔹 Préparer édition */
  onEdit(evalItem: Eval): void {
    this.selectedEval = { ...evalItem };
  }
}

// import { Component, OnInit } from '@angular/core';
// import { EvalService } from 'src/app/core/services/eval.service';
// import { UserService } from 'src/app/core/services/user.service';
// import { Eval } from 'src/app/core/models/eval';

// @Component({
//   selector: 'app-teacher-evals-list',
//   templateUrl: './teacher-evals-list.component.html'
// })
// export class TeacherEvalsListComponent implements OnInit {
//   evals: Eval[] = [];
//   teacherId!: string;
//   loading = false;
//   selectedEval: Eval | null = null;
//   msg = '';

//   constructor(
//     private evalService: EvalService,
//     private userService: UserService
//   ) {}

//   ngOnInit(): void {
//     const teacher = this.userService.getCurrentUser() || JSON.parse(localStorage.getItem('user')!);
//     if (!teacher?._id) {
//       this.msg = '⚠️ No teacher connected';
//       return;
//     }

//     this.teacherId = teacher._id;
//     this.loadMyEvals();
//   }

//   loadMyEvals(): void {
//     this.loading = true;
//     this.evalService.getEvalsByTeacher(this.teacherId).subscribe({
//       next: (res) => {
//         this.evals = res;
//         this.loading = false;
//       },
//       error: (err) => {
//         this.msg = '❌ Error loading evaluations';
//         this.loading = false;
//         console.error(err);
//       }
//     });
//   }

// // ✅ Supprimer une évaluation
//   onDelete(id: string): void {
//     this.evalService.deleteEval(id).subscribe({
//       next: () => {
//         this.msg = '✅ Évaluation supprimée';
//         const teacher = JSON.parse(localStorage.getItem('user') || 'null');
//         this.loadMyEvals();
//       },
//       error: (err) => {
//         console.error('❌ Erreur suppression évaluation:', err);
//         this.msg = '❌ Error deleting evaluation';
//       }
//     });
//   }

//     // ✅ Éditer une évaluation
//   onEdit(evalItem: Eval): void {
//     this.selectedEval = { ...evalItem };
//   }

 
//   // ✅ Supprimer toutes les évaluations du teacher
//   onDeleteAll(): void {
//     this.evalService.deleteAllEvalsByTeacher().subscribe({
//       next: () => {
//         this.msg = '✅ Toutes les évaluations ont été supprimées';
//         this.evals = [];
//       },
//       error: (err) => {
//         console.error('❌ Erreur suppression évaluations:', err);
//         this.msg = '❌ Error deleting all evaluations';
//       }
//     });
//   }

// }



