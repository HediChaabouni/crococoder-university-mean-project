import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../../core/services/admin.service';

@Component({
  selector: 'app-admin-assign',
  templateUrl: './admin-assign.component.html'
})
export class AdminAssignComponent implements OnInit {

  // listes pour les selects
  teachers: any[] = [];
  students: any[] = [];
  courses: any[] = [];
  classes: any[] = [];
  evals: any[] = [];

  // 4 formulaires
  // fTeacherCourse!: FormGroup;
  fTeacherClass!: FormGroup;
  fCourseClass!: FormGroup;
  fStudentLinks!: FormGroup;

  loading = false;
  msg = '';

  constructor(private fb: FormBuilder, private admin: AdminService) { }

  ngOnInit(): void {
    console.log('🟣 AdminAssignComponent loaded');

    this.loadLists();

    // this.fTeacherCourse = this.fb.group({
    //   teacherId: ['', Validators.required],
    //   courseId: ['', Validators.required]
    // });

    this.fTeacherClass = this.fb.group({
      teacherId: ['', Validators.required],
      classId: ['', Validators.required]
    });

    this.fCourseClass = this.fb.group({
      courseId: ['', Validators.required],
      classId: ['', Validators.required]
    });

    this.fStudentLinks = this.fb.group({
      studentId: ['', Validators.required],
      classId: [''],
      courseId: [''],
      teacherId: ['']
    });
  }

  loadLists(): void {
    this.admin.getUsersByRole('teacher').subscribe(t => this.teachers = t);
    this.admin.getUsersByRole('student').subscribe(s => this.students = s);
    this.admin.getAllCourses().subscribe(c => this.courses = c);
    this.admin.getAllClasses().subscribe(c => this.classes = c);
  }

  // submitTeacherCourse(): void {
  //   if (this.fTeacherCourse.invalid) return;
  //   const { teacherId, courseId } = this.fTeacherCourse.value;
  //   this.loading = true; this.msg = '';
  //   this.admin.assignTeacherToCourse(teacherId, courseId).subscribe({
  //     next: () => this.msg = '✅ Teacher ↔ Course ok',
  //     error: e => this.msg = e.error?.message || '❌ erreur',
  //     complete: () => this.loading = false
  //   });
  // }

  submitTeacherClass(): void {
    if (this.fTeacherClass.invalid) return;
    const { teacherId, classId } = this.fTeacherClass.value;
    this.loading = true; this.msg = '';
    this.admin.assignTeacherToClass(teacherId, classId).subscribe({
      next: () => this.msg = '✅ Teacher ↔ Class ok',
      error: e => this.msg = e.error?.message || '❌ erreur',
      complete: () => this.loading = false
    });
  }

  submitCourseClass(): void {
    if (this.fCourseClass.invalid) return;
    const { courseId, classId } = this.fCourseClass.value;
    this.loading = true; this.msg = '';
    this.admin.assignCourseToClass(courseId, classId).subscribe({
      next: () => this.msg = '✅ Course ↔ Class ok',
      error: e => this.msg = e.error?.message || '❌ erreur',
      complete: () => this.loading = false
    });
  }

  submitStudentLinks(): void {
  console.log('🟢 submitStudentLinks() triggered');

  // Vérifie la validité du formulaire
  if (this.fStudentLinks.invalid) {
    console.warn('⚠️ Form invalid, cannot assign');
    this.msg = '⚠️ Please select at least one link before submitting.';
    return;
  }

  const { studentId, teacherId, classId, courseId } = this.fStudentLinks.value;
  console.log('📤 Envoi assignations :', { studentId, teacherId, classId, courseId });

  // Reset message et active le spinner
  this.loading = true;
  this.msg = '';

  let completed = 0; // pour savoir quand toutes les requêtes sont finies
  const total =
    (teacherId ? 1 : 0) +
    (classId ? 1 : 0) +
    (courseId ? 1 : 0);

  if (total === 0) {
    this.msg = '⚠️ Please select at least one link (teacher, class, or course).';
    this.loading = false;
    return;
  }

  // Fonction utilitaire pour clôturer les appels
  const done = () => {
    completed++;
    if (completed === total) {
      this.loading = false;
      console.log('✅ All assignments processed.');
    }
  };

  // ---- Student → Teacher ----
  if (teacherId) {
    this.admin.assignStudentToTeacher(studentId, teacherId).subscribe({
      next: () => {
        console.log('✅ Student assigned to teacher');
        this.msg += '✅ Student ↔ Teacher ok. ';
      },
      error: err => {
        console.error('❌ Error assigning student to teacher:', err);
        this.msg += '❌ Error linking Student ↔ Teacher. ';
      },
      complete: done
    });
  }

  // ---- Student → Class ----
  if (classId) {
    this.admin.assignStudentToClass(studentId, classId).subscribe({
      next: () => {
        console.log('✅ Student assigned to class');
        this.msg += '✅ Student ↔ Class ok. ';
      },
      error: err => {
        console.error('❌ Error assigning student to class:', err);
        this.msg += '❌ Error linking Student ↔ Class. ';
      },
      complete: done
    });
  }

  // ---- Student → Course ----
  if (courseId) {
    this.admin.assignStudentToCourse(studentId, courseId).subscribe({
      next: () => {
        console.log('✅ Student assigned to course');
        this.msg += '✅ Student ↔ Course ok. ';
      },
      error: err => {
        console.error('❌ Error assigning student to course:', err);
        this.msg += '❌ Error linking Student ↔ Course. ';
      },
      complete: done
    });
  }
}

}

