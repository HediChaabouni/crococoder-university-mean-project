import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from '../models/course';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private courseUrl = `${environment.apiBaseUrl}/courses`;
  constructor(private http: HttpClient) { }

  private courseToEdit: Course | null = null;

  setCourseToEdit(course: Course): void {
    this.courseToEdit = course;
  }

  getCourseToEdit(): Course | null {
    return this.courseToEdit;
  }

  clearCourseToEdit(): void {
    this.courseToEdit = null;
  }

  // ➕ Create
  createCourse(course: Course): Observable<Course> {
    console.log('📦 Payload envoyé pour createCourse:', course);
    return this.http.post<Course>(this.courseUrl, course);
  }

  // 📚 Read
  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.courseUrl);
  }

  getCourseById(id: string): Observable<Course> {
    return this.http.get<Course>(`${this.courseUrl}/${id}`);
  }

  getCoursesByTeacher(teacherId: string): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.courseUrl}/teacher/${teacherId}`);
  }

  getCoursesByStudent(studentId: string): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.courseUrl}/student/${studentId}`);
  }

  // ✏️ Update
  updateCourse(id: string, course: Course): Observable<Course> {
    return this.http.put<Course>(`${this.courseUrl}/${id}`, course);
  }

  // ❌ Delete
  deleteCourse(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.courseUrl}/${id}`);
  }

  deleteAllCoursesByTeacher(): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.courseUrl}/my-courses`);
  }
}

