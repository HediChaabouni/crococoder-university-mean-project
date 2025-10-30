import express from 'express';
import {
  createClass,
  getAllClasses,
  getClassById,
  getClassesByTeacher,
  updateClass,
  deleteClass,
  deleteAllClasses,
  getClassByStudent
  } from '../controllers/classController.js';

const router = express.Router();

// CRUD Publics 
router.get('/', getAllClasses);
router.get('/:id', getClassById);
// ➕ spécifiques Teacher :
router.get('/teacher/:id/classes', getClassesByTeacher);

// CRUD Privés pour les tests des API (usage effectif chez Admin dans un 2nd temps a travers admin-crud.component)
router.post('/', createClass);
router.put('/:id', updateClass);
router.delete('/:id', deleteClass);
router.delete('/', deleteAllClasses);

// ➕ spécifiques Student :
router.get('/student/:id', getClassByStudent); // read class by student id

export default router;
