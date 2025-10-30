import Course from '../models/Course.js';
import User from '../models/User.js';

// ➕ Create (POST /api/courses)
export const createCourse = async (req, res) => {
  try {
    console.log('📥 Reçu du front:', req.body);

    const { courseTitle, courseLevel, courseDescription, courseImageUrl, teacherIds, studentIds, classIds } = req.body;

    // Validation basique
    if (!courseTitle || !courseLevel || !courseDescription) {
      return res.status(400).json({ message: 'Les champs titre, niveau et description sont requis.' });
    }

    const newCourse = new Course({
      courseTitle,
      courseLevel,
      courseDescription,
      courseImageUrl: courseImageUrl || '/uploads/default-course.jpg',
      teacherIds: teacherIds || [],
      studentIds: studentIds || [],
      classIds: classIds || []
    });

    await newCourse.save();
    console.log('✅ Course created:', newCourse);

    res.status(201).json(newCourse);
  } catch (error) {
    console.error('❌ Erreur dans createCourse:', error);
    res.status(500).json({ message: 'Erreur serveur lors de la création du cours.' });
  }
};


// ➡️ Read all (GET /api/courses)
export const getCourses = async (_req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ➡️ Read one (GET /api/courses/:id)
export const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: "Course not found" });
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/courses/student/:studentId
export const getCoursesByStudent = async (req, res) => {
  try {
    const { studentId } = req.params;

    // Ici on suppose que ton modèle Course a une propriété `students` (array d'ObjectId User)
    const courses = await Course.find({ students: studentId }).populate('teacherId', 'firstName lastName email');

    res.json(courses);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

// ➡️ Update (PUT /api/courses/:id)
export const updateCourse = async (req, res) => {
  try {
    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      {
        courseTitle: req.body.courseTitle,
        courseLevel: req.body.courseLevel,
        courseDescription: req.body.courseDescription,
        courseImageUrl: req.body.courseImageUrl,
        teacherIds: req.body.teacherIds || [],
        studentIds: req.body.studentIds || [],
        classIds: req.body.classIds || []
      },
      { new: true }
    );

    if (!updatedCourse) return res.status(404).json({ message: 'Course not found' });
    res.json(updatedCourse);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ➡️ Delete (DELETE /api/courses/:id)
export const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) return res.status(404).json({ message: "Course not found" });
    res.json({ message: "Course deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ➡️ Delete All (DELETE /api/courses)
export const deleteAllCourses = async (req, res) => {
  try {
    await Course.deleteMany({});
    res.json({ message: '✅ All courses deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/* ================================
   GET COURSES BY TEACHER
   ================================ */
// GET /api/courses/teacher/:teacherId
export const getCoursesByTeacher = async (req, res) => {
  try {
    const teacherId = req.params.id;

    // Vérifier que le teacher existe et est bien un teacher
    const teacher = await User.findById(teacherId);
    if (!teacher || teacher.role !== 'teacher') {
      return res.status(404).json({ message: 'Teacher not found' });
    }

    // Récupérer les cours assignés à ce teacher
    const courses = await Course.find({ teacherIds: teacherId })
      .populate('classIds', 'className classYear');

    return res.status(200).json(courses);
  } catch (e) {
    console.error('❌ Error in getCoursesByTeacher:', e);
    return res.status(500).json({ message: e.message });
  }
};

/* ================================
   DELETE ALL COURSES BY TEACHER
   ================================ */
// DELETE /api/courses/teacher/:teacherId
export const deleteAllCoursesByTeacher = async (req, res) => {
  try {
    const teacherId = req.params.teacherId;

    // Vérifier que le teacher existe
    const teacher = await User.findById(teacherId);
    if (!teacher || teacher.role !== 'teacher') {
      return res.status(404).json({ message: 'Teacher not found' });
    }

    // Supprimer tous les cours créés par ce teacher
    const result = await Course.deleteMany({ createdBy: teacherId });

    return res.json({
      message: `All courses deleted for teacher ${teacher.firstName} ${teacher.lastName}`,
      deletedCount: result.deletedCount
    });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};