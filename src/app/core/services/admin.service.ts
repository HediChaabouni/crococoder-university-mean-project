import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { Course } from '../models/course';
import { Class } from '../models/class';
import { Eval } from '../models/eval';

@Injectable({ providedIn: 'root' })
export class AdminService {

  private adminUrl = `${environment.apiBaseUrl}/admin`;

  constructor(private http: HttpClient) { }

  /* ==================== DASHBOARD STATS ==================== */
  getDashboardStats(): Observable<any> {
    return this.http.get<any>(`${this.adminUrl}/stats`);
  }

  /* ==================== USERS ==================== */

  // Validation teachers
  validateTeacher(id: string): Observable<any> {
    return this.http.put(`${this.adminUrl}/validate-teacher/${id}`, {});
  }

  // Alias pratique → retourne uniquement les enseignants
  getTeachers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.adminUrl}/users?role=teacher`);
  }

  // Générique : récupère les users par rôle ou tous
  getUsersByRole(role?: 'teacher' | 'student' | 'parent' | 'admin'): Observable<User[]> {
    const url = role ? `${this.adminUrl}/users?role=${role}` : `${this.adminUrl}/users`;
    return this.http.get<User[]>(url);
  }

  // Récupère tous les users (sans filtre de rôle)
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.adminUrl}/users`);
  }

  // delete user by id or all users
  deleteUser(id: string): Observable<any> {
    return this.http.delete(`${this.adminUrl}/users/${id}`);
  }
  // delete all users
  deleteAllUsers(): Observable<any> {
    return this.http.delete(`${this.adminUrl}/users`);
  }


  // Assignations (body payloads)
  // assignTeacherToCourse(teacherId: string, courseId: string) {
  //   return this.http.put(`${this.adminUrl}/assign/teacher-course`, { teacherId, courseId });
  // }
  assignTeacherToClass(teacherId: string, classId: string) {
    return this.http.put(`${this.adminUrl}/assign/teacher-class`, { teacherId, classId });
  }
  assignCourseToClass(courseId: string, classId: string) {
    return this.http.put(`${this.adminUrl}/assign/course-class`, { courseId, classId });
  }
  assignStudentToClass(studentId: string, classId?: string) {
    return this.http.put(`${this.adminUrl}/assign/student-class`, { studentId, classId });
  }
  assignStudentToCourse(studentId: string, courseId?: string) {
    return this.http.put(`${this.adminUrl}/assign/student-course`, { studentId, courseId });
  }
  assignStudentToTeacher(studentId: string, teacherId?: string) {
    return this.http.put(`${this.adminUrl}/assign/student-teacher`, { studentId, teacherId });
  }

  /* ==================== COURSES, CLASSES, EVALS ==================== */

  /* COURSES */
  getAllCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.adminUrl}/courses`);
  }

  updateCourse(id: string, course: Partial<Course>): Observable<Course> {
    return this.http.put<Course>(`${this.adminUrl}/courses/${id}`, course);
  }

  deleteCourse(id: string): Observable<any> {
    return this.http.delete(`${this.adminUrl}/courses/${id}`);
  }

  deleteAllCourses(): Observable<any> {
    return this.http.delete(`${this.adminUrl}/courses`);
  }

  /* CLASSES */
  createClass(data: any): Observable<Class> {
    return this.http.post<Class>(`${this.adminUrl}/classes`, data);
  }

  getAllClasses(): Observable<Class[]> {
    return this.http.get<Class[]>(`${this.adminUrl}/classes`);
  }

  updateClass(id: string, cls: Partial<Class>): Observable<Class> {
    return this.http.put<Class>(`${this.adminUrl}/classes/${id}`, cls);
  }

  deleteClass(id: string): Observable<any> {
    return this.http.delete(`${this.adminUrl}/classes/${id}`);
  }

  deleteAllClasses(): Observable<any> {
    return this.http.delete(`${this.adminUrl}/classes`);
  }

  /* EVALS */
  getAllEvals(): Observable<Eval[]> {
    return this.http.get<Eval[]>(`${this.adminUrl}/evals`);
  }

  updateEval(id: string, evalData: Partial<Eval>): Observable<Eval> {
    return this.http.put<Eval>(`${this.adminUrl}/evals/${id}`, evalData);
  }

  deleteEval(id: string): Observable<any> {
    return this.http.delete(`${this.adminUrl}/evals/${id}`);
  }

  deleteAllEvals(): Observable<any> {
    return this.http.delete(`${this.adminUrl}/evals`);
  }

}





