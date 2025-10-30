import express from 'express';
import {
  createEval,
  getEvals,
  getEvalById,
  updateEval,
  deleteEval,
  deleteAllEvals,
  getEvalsByTeacher,
  deleteAllEvalsByTeacher,
  getEvalsByStudent,
  getEvalsByParent
} from '../controllers/evalController.js';

const router = express.Router();

// CRUD standard déjà existant :
router.post('/', createEval);
router.get('/', getEvals);
router.get('/:id', getEvalById);
router.put('/:id', updateEval);
router.delete('/:id', deleteEval);
router.delete('/', deleteAllEvals);   // supprime TOUS les evals (à utiliser avec précaution !)

// ➕ spécifiques Teacher :
router.get('/teacher/:teacherId', getEvalsByTeacher);
router.delete('/teacher/:teacherId', deleteAllEvalsByTeacher);

// ➕ spécifiques Student :
router.get('/student/:studentId', getEvalsByStudent);

// ✅ Parent : toutes les évaluations de ses enfants
router.get('/parent/:parentId', getEvalsByParent);

export default router;
