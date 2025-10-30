import express from 'express';
import {
  getCourses, createCourse, updateCourse, deleteCourse, deleteAllCourses, getCourseById, getCoursesByTeacher,
  deleteAllCoursesByTeacher, getCoursesByStudent
} from '../controllers/courseController.js';

const router = express.Router();

// CRUD standards
router.get('/', getCourses);      // R
router.post('/', createCourse);   // C
router.put('/:id', updateCourse); // U
router.delete('/:id', deleteCourse); // D
router.delete('/', deleteAllCourses);   // D all
router.get('/:id', getCourseById); // R one

// ➕ spécifiques Teacher :
router.get('/teacher/:id', getCoursesByTeacher); // R all courses by teacher id
router.delete('/teacher/:teacherId', deleteAllCoursesByTeacher); // D by id and all courses

// ➕ spécifiques Student :
router.get('/student/:studentId', getCoursesByStudent); // R all courses by student id


export default router;
