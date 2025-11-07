import express from 'express';
import multer from 'multer';

import {
  createUser,
  loginUser,
  getUsers,
  getUsersByRole,
  getUserById,
  getStudentsByTeacher,
  getTeachersByStudent,
  getChildrenByParent,
  updateUser,
  deleteUser,
  deleteAllUsers,
  searchChild,
  linkChild
} from '../controllers/userController.js';

const router = express.Router();

/* ==========================================
   🧰 CONFIGURATION DE MULTER
   ========================================== */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    // Nettoyage du nom pour éviter caractères spéciaux
    const safeName = file.originalname.replace(/[^\w.-]/g, '').toLowerCase();
    cb(null, Date.now() + '-' + safeName);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 20 * 1024 * 1024 } // 20 Mo max
});

const uploadFields = upload.fields([
  { name: 'teacherCV', maxCount: 1 },
  { name: 'teacherPhoto', maxCount: 1 },
  { name: 'studentPhoto', maxCount: 1 }
]);

/* ==========================================
   🧾 SIGNUP ROUTES (avec gestion des fichiers)
   ========================================== */
router.post('/signup-student', uploadFields, createUser);
router.post('/signup-teacher', uploadFields, createUser);
router.post('/signup-parent', uploadFields, createUser);  // ok même sans fichier
router.post('/signup-admin', uploadFields, createUser);   // idem, safe

/* ==========================================
   👥 USERS CRUD ROUTES
   ========================================== */
router.get('/', getUsers);
router.get('/role/:role', getUsersByRole);
router.get('/search-child', searchChild);
router.post('/link-child', linkChild);
router.get('/teacher/:id/students', getStudentsByTeacher);
router.get('/student/:id/teachers', getTeachersByStudent)
router.get('/parent/:id/children', getChildrenByParent);
router.get('/:id', getUserById);        // ⚠️ Les dynamiques simples en dernier
router.put('/:id', upload.none(), updateUser);
router.delete('/:id', deleteUser);
router.delete('/', deleteAllUsers);

/* ==========================================
   🔐 AUTH ROUTES
   ========================================== */
router.post('/login', loginUser);
router.post('/logout', (_req, res) => res.json({ message: 'User logged out successfully' }));


export default router;

