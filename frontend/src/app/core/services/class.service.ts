import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Class } from '../models/class';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClassService {

  private classUrl = `${environment.apiBaseUrl}/classes`;

  constructor(private http: HttpClient) { }

  // createClass(classData: Class): Observable<Class> {
  //   return this.http.post<Class>(this.classUrl, classData);
  // }

  getClasses(): Observable<Class[]> {
    return this.http.get<Class[]>(this.classUrl);
  }

  getClassById(id: string): Observable<Class> {
    return this.http.get<Class>(`${this.classUrl}/${id}`);
  }

  getClassByStudent(studentId: string) {
    return this.http.get<Class>(`${this.classUrl}/student/${studentId}`); // renvoie { class, classmates }
  }

  getClassesByTeacher(teacherId: string): Observable<any[]> {
    return this.http.get<Class[]>(`${this.classUrl}/teacher/${teacherId}/classes`);
  }

  // updateClass(id: string, classData: Class): Observable<Class> {
  //   return this.http.put<Class>(`${this.classUrl}/${id}`, classData);
  // }

  // deleteClass(id: string): Observable<any> {
  //   return this.http.delete(`${this.classUrl}/${id}`);
  // }

  //   deleteAllClasses(): Observable<any> {
  //   return this.http.delete(this.classUrl);
  // }

}
