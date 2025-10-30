import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Eval } from '../models/eval';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EvalService {

  private evalUrl = `${environment.apiBaseUrl}/evals`;

  constructor(private http: HttpClient) { }

  createEval(evalData: Eval): Observable<Eval> {
    return this.http.post<Eval>(this.evalUrl, evalData);
  }

  getEvals(): Observable<Eval[]> {
    return this.http.get<Eval[]>(this.evalUrl);
  }

  getEvalById(id: string): Observable<Eval> {
    return this.http.get<Eval>(`${this.evalUrl}/${id}`);
  }

  /** ✅ Evals d’un parent (tous ses enfants) */
  getEvalsByParent(parentId: string): Observable<Eval[]> {
    return this.http.get<Eval[]>(`${this.evalUrl}/parent/${parentId}`);
  }

  /** Evals d’un student — utile côté Student */
  getEvalsByStudent(studentId: string): Observable<Eval[]> {
    return this.http.get<Eval[]>(`${this.evalUrl}/student/${studentId}`);
  }

  updateEval(id: string, evalData: Eval): Observable<Eval> {
    return this.http.put<Eval>(`${this.evalUrl}/${id}`, evalData);
  }

  deleteEval(id: string): Observable<any> {
    return this.http.delete(`${this.evalUrl}/${id}`);
  }

  /** ✅ Evals d’un teacher — utile côté Teacher */
  getEvalsByTeacher(teacherId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.evalUrl}/teacher/${teacherId}`);
  }

  // deleteAllEvalsByTeacher(): Observable<any> {
  //   const teacherId = localStorage.getItem('userId'); // idem, à adapter
  //   return this.http.delete(`${this.evalUrl}/teacher/${teacherId}`);
  // }
  
  deleteAllEvalsByTeacher(teacherId: string): Observable<any> {
    return this.http.delete(`${this.evalUrl}/teacher/${teacherId}`);
  }

}
