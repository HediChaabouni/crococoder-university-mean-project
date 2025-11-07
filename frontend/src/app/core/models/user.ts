// src/app/core/models/user.ts
// Modèle TypeScript pour un utilisateur (User)
// Définit la structure des données pour un utilisateur dans le système universitaire

import { Class } from './class';

export type UserRole = 'student' | 'teacher' | 'parent' | 'admin';

export interface User {
  _id?: string;

  // Champs communs
  firstName: string;
  lastName: string;
  email: string;
  tel: string;
  address: string;

  // Mot de passe : optionnel côté front (les formulaires l’exigeront via validators)
  password?: string;

  role: UserRole;

  // Spécifiques Teacher
  teacherSpecialty?: string;
  teacherCV?: string;        // chemin du fichier uploadé
  teacherValidated?: boolean;  // ✅ ajouté par un admin
  teacherPhoto?: string;     // chemin du fichier image uploadé

  // Spécifiques Student
  studentPhoto?: string;     // chemin du fichier image uploadé

  // Spécifiques Parent
  childTel?: string;
  childNumber?: number;
  childIds?: string[];       // ids des enfants d'un parent 

  // Relations générales
  courseIds?: string[];
  classIds?: (string | Class)[]; // ✅ peut être string ou Class selon le cas
  evalIds?: string[];

  // Autres Relations spécifiques
  parentId?: string;             // ✅ le parent de l’enfant
  teacherIds?: string[];         // ✅ les enseignants du student
  studentIds?: string[];         // ✅ les students du teacher

   // Métadonnées facultatives
  alreadyLinked?: 'you' | 'other' | null ;  // ✅ ajouté par le backend dans searchChild

  // Mongo
  createdAt?: string;
  updatedAt?: string;
}

// Notes :
// - Les champs optionnels sont marqués avec ?
// - Les relations (courseIds, classIds, evalIds) sont des tableaux d’IDs de chaînes de caractères
// - Le mot de passe est optionnel car il ne sera pas toujours renvoyé par le backend (ex : lors d’une requête GET)
// - Les fichiers (teacherCV, studentPhoto) sont gérés via des uploads, ici on stocke juste le chemin du fichier
// - Le rôle de l’utilisateur est défini par le type UserRole
// - Les timestamps createdAt et updatedAt sont gérés automatiquement par MongoDB