// src/app/core/models/course.ts
// Modèle TypeScript pour un cours (Course)
// Définit la structure des données pour un cours dans le système universitaire

export interface Course {
  _id?: string;
  courseTitle: string;
  courseLevel: string;
  courseDescription: string;
  courseImageUrl?: string;

  // Relations
  teacherIds?: string[];  // Références vers User (teachers)
  studentIds?: string[];  // Références vers User (students)
  classIds?: string[];    // Références vers Class
  // Timestamps
  createdAt?: string;
  updatedAt?: string;
}

