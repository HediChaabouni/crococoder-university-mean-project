import User from '../models/User.js'; // Teachers, Students, Admins, Parents
import Course from '../models/Course.js';
import Class from '../models/Class.js';
import Eval from '../models/Eval.js';

export const getDashboardStats = async (req, res) => {
    try {
        const [teachers, students, courses, classes, evals] = await Promise.all([
            User.countDocuments({ role: 'teacher' }),
            User.countDocuments({ role: 'student' }),
            Course.countDocuments(),
            Class.countDocuments(),
            Eval.countDocuments()
        ]);

        res.status(200).json({
            teachers,
            students,
            courses,
            classes,
            evals
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching dashboard stats', error });
    }
};

// Validation des enseignants (flag teacherValidated)
export const validateTeacher = async (req, res) => {
    try {
        const teacher = await User.findById(req.params.id);
        if (!teacher || teacher.role !== 'teacher') {
            return res.status(404).json({ message: 'Teacher not found' });
        }
        // flag simple (pratique pour ton CC)
        teacher.teacherValidated = true;
        await teacher.save();
        res.json({ message: 'Teacher validated', teacher });
    } catch (e) { res.status(400).json({ message: e.message }); }
};

// Gestion des assignations :

// ─────────────────────────────────────────────
// TEACHER ↔ COURSE
// ─────────────────────────────────────────────
// export const assignTeacherToCourse = async (req, res) => {
//     try {
//         const { teacherId, courseId } = req.body;
//         const teacher = await User.findById(teacherId);
//         const course = await Course.findById(courseId);

//         if (!teacher || teacher.role !== 'teacher') return res.status(404).json({ message: 'Teacher not found' });
//         if (!course) return res.status(404).json({ message: 'Course not found' });

//         await User.updateOne({ _id: teacherId }, { $addToSet: { courseIds: courseId } });
//         await Course.updateOne({ _id: courseId }, { $addToSet: { teacherIds: teacherId } });

//         res.json({ message: '✅ Teacher assigned to Course', teacher, course });

//     } catch (e) {

//         res.status(500).json({ message: '❌ Error assigning teacher to course', error: e.message });
//     }
// };

// ─────────────────────────────────────────────
// TEACHER ↔ CLASS
// ─────────────────────────────────────────────
export const assignTeacherToClass = async (req, res) => {
    try {
        const { teacherId, classId } = req.body;
        const teacher = await User.findById(teacherId);
        const klass = await Class.findById(classId);
        if (!teacher || teacher.role !== 'teacher') return res.status(404).json({ message: 'Teacher not found' });
        if (!klass) return res.status(404).json({ message: 'Class not found' });

        await User.updateOne({ _id: teacherId }, { $addToSet: { classIds: classId } });
        await Class.updateOne({ _id: classId }, { $addToSet: { teacherIds: teacherId } });

        res.json({ message: '✅ Teacher assigned to Class', teacher, klass });
    } catch (e) {
        res.status(500).json({ message: '❌ Error assigning teacher to class', error: e.message });
    }
};

// ─────────────────────────────────────────────
// COURSE ↔ CLASS
// ─────────────────────────────────────────────
export const assignCourseToClass = async (req, res) => {
    try {
        const { courseId, classId } = req.body;
        const course = await Course.findById(courseId);
        const klass = await Class.findById(classId);
        if (!course) return res.status(404).json({ message: 'Course not found' });
        if (!klass) return res.status(404).json({ message: 'Class not found' });

        await Course.updateOne({ _id: courseId }, { $addToSet: { classIds: classId } });
        await Class.updateOne({ _id: classId }, { $addToSet: { courseIds: courseId } });

        res.json({ message: '✅ Course assigned to Class', course, klass });
    } catch (e) {
        res.status(500).json({ message: '❌ Error assigning course to class', error: e.message });
    }
};

// ─────────────────────────────────────────────
// STUDENT ↔ CLASS
// ─────────────────────────────────────────────
export const assignStudentToClass = async (req, res) => {
    try {
        const { studentId, classId } = req.body;
        const student = await User.findById(studentId);
        const klass = await Class.findById(classId);
        if (!student || student.role !== 'student') return res.status(404).json({ message: 'Student not found' });
        if (!klass) return res.status(404).json({ message: 'Class not found' });

        await User.updateOne({ _id: studentId }, { $addToSet: { classIds: classId } });
        await Class.updateOne({ _id: classId }, { $addToSet: { studentIds: studentId } });

        res.json({ message: '✅ Student assigned to Class', student, klass });
    } catch (e) {
        res.status(500).json({ message: '❌ Error assigning student to class', error: e.message });
    }
};

// ─────────────────────────────────────────────
// STUDENT ↔ COURSE
// ─────────────────────────────────────────────
export const assignStudentToCourse = async (req, res) => {
    try {
        const { studentId, courseId } = req.body;
        const student = await User.findById(studentId);
        const course = await Course.findById(courseId);
        if (!student || student.role !== 'student') return res.status(404).json({ message: 'Student not found' });
        if (!course) return res.status(404).json({ message: 'Course not found' });

        await User.updateOne({ _id: studentId }, { $addToSet: { courseIds: courseId } });
        await Course.updateOne({ _id: courseId }, { $addToSet: { studentIds: studentId } });

        res.json({ message: '✅ Student assigned to Course', student, course });
    } catch (e) {
        res.status(500).json({ message: '❌ Error assigning student to course', error: e.message });
    }
};

// ─────────────────────────────────────────────
// STUDENT ↔ TEACHER
// ─────────────────────────────────────────────
export const assignStudentToTeacher = async (req, res) => {
    try {
        console.log('🟢 assignStudentToTeacher called:', req.body);
        const { studentId, teacherId } = req.body;
        const student = await User.findById(studentId);
        const teacher = await User.findById(teacherId);
        if (!student || student.role !== 'student') return res.status(404).json({ message: 'Student not found' });
        if (!teacher || teacher.role !== 'teacher') return res.status(404).json({ message: 'Teacher not found' });

        await User.updateOne({ _id: studentId }, { $addToSet: { teacherIds: teacherId } });
        await User.updateOne({ _id: teacherId }, { $addToSet: { studentIds: studentId } });
        console.log('✅ Student assigned successfully');
        res.json({ message: '✅ Student assigned to Teacher', student, teacher });
    } catch (e) {
        console.error('❌ Error assigning student to teacher:', e.message);
        res.status(500).json({ message: '❌ Error assigning student to teacher', error: e.message });
    }
};

// Listes pour alimenter les <select>
export const getAllByRole = async (req, res) => {
    try {
        const role = req.query.role;
        const users = await User.find(role ? { role } : {});
        res.json(users);
    } catch (e) { res.status(400).json({ message: e.message }); }
};

// Versions simplifiées getAll(sans populate) si besoin
// export const getAllCourses = async (_req, res) => {
//   try { res.json(await Course.find()); }
//   catch (e) { res.status(400).json({ message: e.message }); }
// };
// export const getAllClasses = async (_req, res) => {
//   try { res.json(await Class.find()); }
//   catch (e) { res.status(400).json({ message: e.message }); }
// };
// export const getAllEvals = async (_req, res) => {
//   try { res.json(await Eval.find()); }
//   catch (e) { res.status(400).json({ message: e.message }); }
// };

/* ================= USERS ================= */
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const deleted = await User.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: 'User not found' });
        res.json({ message: 'User deleted successfully' });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};

export const deleteAllUsers = async (req, res) => {
    try {
        await User.deleteMany({});
        res.json({ message: 'All users deleted' });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};

/* ================= COURSES ================= */
export const getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find().populate('teacherId');
        res.json(courses);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};

export const deleteCourse = async (req, res) => {
    try {
        const deleted = await Course.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: 'Course not found' });
        res.json({ message: 'Course deleted successfully' });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};

export const deleteAllCourses = async (req, res) => {
    try {
        await Course.deleteMany({});
        res.json({ message: 'All courses deleted' });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};

export const updateCourse = async (req, res) => {
    try {
        const updated = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updated) return res.status(404).json({ message: 'Course not found' });
        res.json(updated);
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
};

/* ================= CLASSES ================= */
// ➡️ Create Class
export const createClass = async (req, res) => {
    try {
        const newClass = new Class({
            className: req.body.className,
            classYear: req.body.classYear,
            teacherIds: req.body.teacherIds || [],
            studentIds: req.body.studentIds || [],
            courseIds: req.body.courseIds || []
        });
        await newClass.save();
        res.status(201).json(newClass);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// ➡️ Read all Classes
export const getAllClasses = async (_req, res) => {
  try {
    const classes = await Class.find();
    res.json(classes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteClass = async (req, res) => {
    try {
        const deleted = await Class.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: 'Class not found' });
        res.json({ message: 'Class deleted successfully' });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};

export const deleteAllClasses = async (req, res) => {
    try {
        await Class.deleteMany({});
        res.json({ message: 'All classes deleted' });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};

export const updateClass = async (req, res) => {
    try {
        const updated = await Class.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updated) return res.status(404).json({ message: 'Class not found' });
        res.json(updated);
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
};

/* ================= EVALS ================= */
export const getAllEvals = async (req, res) => {
    try {
        const evals = await Eval.find().populate('teacherId studentId classId courseId');
        res.json(evals);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};


export const updateEval = async (req, res) => {
    try {
        const { id } = req.params;
        const { evalNote, evalComment, evalStatus } = req.body;

        const updated = await Eval.findByIdAndUpdate(
            id,
            {
                ...(evalNote !== undefined && { evalNote }),
                ...(evalComment !== undefined && { evalComment }),
                ...(evalStatus !== undefined && { evalStatus })
            },
            { new: true }
        ).populate('studentId', 'firstName lastName')
            .populate('courseId', 'title')
            .populate('teacherId', 'firstName lastName')
            .populate('classId', 'className');

        if (!updated) return res.status(404).json({ message: 'Eval not found' });

        res.json(updated);
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
};

export const deleteEval = async (req, res) => {
    try {
        const deleted = await Eval.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: 'Eval not found' });
        res.json({ message: 'Eval deleted successfully' });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};

export const deleteAllEvals = async (req, res) => {
    try {
        await Eval.deleteMany({});
        res.json({ message: 'All evals deleted' });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};

