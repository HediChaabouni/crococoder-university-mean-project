// src/app/core/models/class.ts
// Modèle TypeScript pour une classe (Class)
// Définit la structure des données pour une classe

export interface Class {
  _id?: string;
  className: string;
  classYear: number;

  // Relations
  teacherIds?: string[];  // Références vers User (teachers)
  studentIds?: string[];  // Références vers User (students)
  courseIds?: string[];   // Références vers Course
  // Timestamps
  createdAt?: string;
  updatedAt?: string;
}
