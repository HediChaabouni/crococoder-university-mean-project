// src/app/core/models/eval.ts
export interface Eval {
  _id?: string;
  evalNote: string;
  evalComment?: string;
  evalStatus: boolean;

  // Relations
  teacherId: any;  
  studentId: any;  
  classId: any;    
  courseId?: any;  

  // Timestamps
  createdAt?: string;
  updatedAt?: string;
}
