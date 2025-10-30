import Eval from '../models/Eval.js';
import User from '../models/User.js';

// ➡️ Create Eval
export const createEval = async (req, res) => {
  try {
    const newEval = new Eval({
      evalNote: req.body.evalNote,
      evalComment: req.body.evalComment || null,
      evalStatus: req.body.evalStatus,
      teacherId: req.body.teacherId,
      studentId: req.body.studentId,
      classId: req.body.classId,
      courseId: req.body.courseId
    });
    await newEval.save();
    res.status(201).json(newEval);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ➡️ Read all Evals without populated references
// export const getEvals = async (_req, res) => {
//   try {
//     const evals = await Eval.find();
//     res.json(evals);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// GET all evals with populated references
export const getEvals = async (req, res) => {
  try {
    const evals = await Eval.find()
      .populate('studentId', 'firstName lastName')
      .populate('teacherId', 'firstName lastName')
      .populate('courseId', 'title')
      .populate('classId', 'className');
    res.json(evals);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};


// ➡️ Read one Eval
export const getEvalById = async (req, res) => {
  try {
    const evalData = await Eval.findById(req.params.id);
    if (!evalData) return res.status(404).json({ message: "Eval not found" });
    res.json(evalData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/evals/student/:studentId : read evals by student id
export const getEvalsByStudent = async (req, res) => {
  try {
    const { studentId } = req.params;

    const evals = await Eval.find({ studentId })
      .populate('teacherId', 'firstName lastName')
      .populate('courseId', 'title')
      .populate('classId', 'className');

    res.json(evals);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

// GET /api/evals/parent/:parentId : read evals par parent ID
export const getEvalsByParent = async (req, res) => {
  try {
    const { parentId } = req.params;

    // On cherche d’abord le parent
    const parent = await User.findById(parentId).populate('childIds');
    if (!parent || parent.role !== 'parent') {
      return res.status(404).json({ message: 'Parent not found' });
    }

    // On prend les IDs des enfants
    const childIds = parent.childIds.map(child => child._id);

    if (!childIds.length) {
      return res.json([]); // Aucun enfant → aucune évaluation
    }

    // On récupère toutes les evals liées à ces enfants
    const evals = await Eval.find({ studentId: { $in: childIds } })
      .populate('studentId', 'firstName lastName tel')
      .populate('courseId', 'title')
      .populate('teacherId', 'firstName lastName')
      .populate('classId', 'className');


    res.json(evals);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

// ➡️ Update Eval
export const updateEval = async (req, res) => {
  try {
    const updatedEval = await Eval.findByIdAndUpdate(
      req.params.id,
      {
        noteEval: req.body.noteEval,
        commentEval: req.body.commentEval || null,
        statusEval: req.body.statusEval,
        teacherId: req.body.teacherId,
        studentId: req.body.studentId,
        classId: req.body.classId,
        courseId: req.body.courseId
      },
      { new: true }
    );

    if (!updatedEval) return res.status(404).json({ message: 'Eval not found' });
    res.json(updatedEval);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ➡️ Delete Eval
export const deleteEval = async (req, res) => {
  try {
    const evalData = await Eval.findByIdAndDelete(req.params.id);
    if (!evalData) return res.status(404).json({ message: "Eval not found" });
    res.json({ message: "Eval deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ➡️ Delete all Evals (use with caution!)
export const deleteAllEvals = async (req, res) => {
  try {
    await Eval.deleteMany({});
    res.json({ message: '✅ All evals deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/* ================================
   GET EVALS BY TEACHER
   ================================ */
// GET /api/evals/teacher/:teacherId
export const getEvalsByTeacher = async (req, res) => {
  try {
    const teacherId = req.params.teacherId;

    const teacher = await User.findById(teacherId);
    if (!teacher || teacher.role !== 'teacher') {
      return res.status(404).json({ message: 'Teacher not found' });
    }

    const evals = await Eval.find({ teacherId })
      .populate('courseId', 'courseTitle')
      .populate('studentId', 'firstName lastName')
      .populate('classId', 'className classYear')

    return res.json(evals);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

/* ================================
   DELETE ALL EVALS BY TEACHER
   ================================ */
// DELETE /api/evals/teacher/:teacherId
export const deleteAllEvalsByTeacher = async (req, res) => {
  try {
    const teacherId = req.params.teacherId;

    const teacher = await User.findById(teacherId);
    if (!teacher || teacher.role !== 'teacher') {
      return res.status(404).json({ message: 'Teacher not found' });
    }

    const result = await Eval.deleteMany({ teacherId });

    return res.json({
      message: `All evals deleted for teacher ${teacher.firstName} ${teacher.lastName}`,
      deletedCount: result.deletedCount
    });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};
