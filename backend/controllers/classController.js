import Class from '../models/Class.js';

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

// ➡️ Read one Class
export const getClassById = async (req, res) => {
  try {
    const _class = await Class.findById(req.params.id);
    if (!_class) return res.status(404).json({ message: "Class not found" });
    res.json(_class);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/students/:id/class : Read classes by student id
export const getClassByStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const student = await User.findById(id);
    if (!student) return res.status(404).json({ message: 'Student not found' });

    if (!student.classId) {
      return res.json({ class: null, classmates: [] });
    }

    const myClass = await Class.findById(student.classId);
    const classmates = await User.find({ classId: student.classId, role: 'student', _id: { $ne: id } });

    res.json({ class: myClass, classmates });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

// GET /api/classes/teacher/:id : Read classes by teacher id
export const getClassesByTeacher = async (req, res) => {
  try {
    const classes = await Class.find({ teacherIds: req.params.id });
    res.status(200).json(classes);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching classes', error: err });
  }
};

// ➡️ Update Class
export const updateClass = async (req, res) => {
  try {
    const updatedClass = await Class.findByIdAndUpdate(
      req.params.id,
      {
        className: req.body.className,
        classYear: req.body.classYear,
        teacherIds: req.body.teacherIds || [],
        studentIds: req.body.studentIds || [],
        courseIds: req.body.courseIds || []
      },
      { new: true }
    );

    if (!updatedClass) return res.status(404).json({ message: 'Class not found' });
    res.json(updatedClass);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ➡️ Delete Class
export const deleteClass = async (req, res) => {
  try {
    const _class = await Class.findByIdAndDelete(req.params.id);
    if (!_class) return res.status(404).json({ message: "Class not found" });
    res.json({ message: "Class deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ➡️ Delete All Class
export const deleteAllClasses = async (req, res) => {
  try {
    await Class.deleteMany();
    res.json({ message: 'All classes deleted' });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};
