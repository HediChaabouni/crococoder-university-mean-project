// Code refactorisé pour simplifier et éviter les duplications
import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../core/services/admin.service';
import { User } from 'src/app/core/models/user';
import { Course } from 'src/app/core/models/course';
import { Class } from 'src/app/core/models/class';
import { Eval } from 'src/app/core/models/eval';

type Section = 'teachers' | 'users' | 'courses' | 'classes' | 'evals';

@Component({
  selector: 'app-admin-crud',
  templateUrl: './admin-crud.component.html'
})
export class AdminCrudComponent implements OnInit {

  selectedSection: Section = 'teachers';

  teachers: User[] = [];
  users: User[] = [];
  courses: Course[] = [];
  classes: Class[] = [];
  evals: Eval[] = [];
  msg = '';
  loading = false;
  newClass = { className: '', classYear: '' };

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.loadData('teachers');
  }

  /* ==================== NAVIGATION ==================== */
  loadData(section: Section): void {
    this.selectedSection = section;
    this.loading = true; this.msg = '';

    switch (section) {
      case 'teachers':
        this.adminService.getTeachers().subscribe({
          next: res => this.teachers = res.filter(t => t.teacherValidated),
          error: err => this.msg = err.error?.message || '❌ Error loading teachers',
          complete: () => this.loading = false
        });
        break;

      case 'users':
        this.adminService.getAllUsers().subscribe({
          next: res => this.users = res,
          error: err => this.msg = err.error?.message || '❌ Error loading users',
          complete: () => this.loading = false
        });
        break;

      case 'courses':
        this.adminService.getAllCourses().subscribe({
          next: res => this.courses = res,
          error: err => this.msg = err.error?.message || '❌ Error loading courses',
          complete: () => this.loading = false
        });
        break;

      case 'classes':
        this.adminService.getAllClasses().subscribe({
          next: res => this.classes = res,
          error: err => this.msg = err.error?.message || '❌ Error loading classes',
          complete: () => this.loading = false
        });
        break;

      case 'evals':
        this.adminService.getAllEvals().subscribe({
          next: res => this.evals = res,
          error: err => this.msg = err.error?.message || '❌ Error loading evals',
          complete: () => this.loading = false
        });
        break;
    }
  }

  /* ==================== TEACHERS ==================== */
  getTeacherName(id: string): string {
    const teacher = this.teachers.find(t => t._id === id);
    return teacher ? `${teacher.firstName} ${teacher.lastName}` : 'Unknown';
  }

  onValidateTeacher(id: string): void {
    this.adminService.validateTeacher(id).subscribe({
      next: () => {
        this.msg = '✅ Teacher validated successfully';
        // Recharge la section actuelle
        this.loadData(this.selectedSection);
      },
      error: err => this.msg = err.error?.message || '❌ Validation error'
    });
  }

  /* ==================== USERS ==================== */
  deleteUser(id: string): void {
    this.adminService.deleteUser(id).subscribe(() => this.loadData('users'));
  }
  deleteAllUsers(): void {
    this.adminService.deleteAllUsers().subscribe(() => this.loadData('users'));
  }

  /* ==================== COURSES ==================== */
  deleteCourse(id: string): void {
    this.adminService.deleteCourse(id).subscribe(() => this.loadData('courses'));
  }
  deleteAllCourses(): void {
    this.adminService.deleteAllCourses().subscribe(() => this.loadData('courses'));
  }

  /* ==================== CLASSES ==================== */
  onAddClass(): void {
    if (!this.newClass.className || !this.newClass.classYear) return;
    this.adminService.createClass(this.newClass).subscribe({
      next: () => {
        this.msg = '✅ Class added successfully';
        this.newClass = { className: '', classYear: '' };
        this.loadData('classes');
      },
      error: err => this.msg = err.error?.message || '❌ Error adding class'
    });
  }

  deleteClass(id: string): void {
    this.adminService.deleteClass(id).subscribe(() => this.loadData('classes'));
  }
  
  deleteAllClasses(): void {
    this.adminService.deleteAllClasses().subscribe(() => this.loadData('classes'));
  }

  /* ==================== EVALS ==================== */
  editEval(e: Eval): void {
    const newNote = prompt('Enter new note:', e.evalNote);
    if (!newNote) return;
    this.adminService.updateEval(e._id!, { evalNote: newNote }).subscribe({
      next: () => this.loadData('evals'),
      error: err => this.msg = err.error?.message || '❌ Update eval failed'
    });
  }

  deleteEval(id: string): void {
    this.adminService.deleteEval(id).subscribe(() => this.loadData('evals'));
  }
  deleteAllEvals(): void {
    this.adminService.deleteAllEvals().subscribe(() => this.loadData('evals'));
  }

}



