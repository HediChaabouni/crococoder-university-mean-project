import express from 'express';
import {
    validateTeacher,
    // assignTeacherToCourse,
    assignTeacherToClass,
    assignCourseToClass,
    assignStudentToClass,
    assignStudentToCourse,
    assignStudentToTeacher,
    // get Stats
    getDashboardStats,
    getAllByRole,       // GET /api/admin/users?role=teacher|student|parent|admin
    getAllUsers, deleteUser, deleteAllUsers,
    getAllCourses, deleteCourse, deleteAllCourses, updateCourse,
    createClass, getAllClasses, deleteClass, deleteAllClasses, updateClass,
    getAllEvals, deleteEval, deleteAllEvals, updateEval
} from '../controllers/adminController.js';

const router = express.Router();

// Validation teacher
router.put('/validate-teacher/:id', validateTeacher);

router.put('/test', (req, res) => {
    console.log("✅ admin/test hit", req.body);
    res.json({ message: "route OK" });
});

// Assignations (body: { teacherId, courseId, classId, studentId })
// router.put('/assign/teacher-course', assignTeacherToCourse);
router.put('/assign/teacher-class', assignTeacherToClass);
router.put('/assign/course-class', assignCourseToClass);
router.put('/assign/student-class', assignStudentToClass);
router.put('/assign/student-course', assignStudentToCourse);
router.put('/assign/student-teacher', assignStudentToTeacher);

// Dashboard stats
router.get('/stats', getDashboardStats); // Route exacte : /api/admin/stats car router monté sur baseUrl/api/admin

// Listes utiles (pour les <select>)

/* USERS */
router.get('/users', getAllByRole);     // /users?role=teacher|student|parent|admin
router.get('/users', getAllUsers);
router.delete('/users/:id', deleteUser);
router.delete('/users', deleteAllUsers);

/* COURSES */
router.get('/courses', getAllCourses);
router.delete('/courses/:id', deleteCourse);
router.delete('/courses', deleteAllCourses);
router.put('/courses/:id', updateCourse);

/* CLASSES */
router.post('/classes', createClass);
router.get('/classes', getAllClasses);
router.delete('/classes/:id', deleteClass);
router.delete('/classes', deleteAllClasses);
router.put('/classes/:id', updateClass);

/* EVALS */
router.get('/evals', getAllEvals);
router.put('/evals/:id', updateEval);   // ✅ nouvelle route
router.delete('/evals/:id', deleteEval);
router.delete('/evals', deleteAllEvals);

export default router;
