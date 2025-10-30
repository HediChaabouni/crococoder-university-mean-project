
import mongoose from 'mongoose';

const evalSchema = new mongoose.Schema({
  evalNote: { type: String, required: true },      // Ex: "15/20" ou "A+"
  evalComment: { type: String, required: false },  // Commentaire du teacher
  evalStatus: { type: Boolean, required: true },   // Validé (true/false)

  // Relations (une évaluation est TOUJOURS liée à un élève, un prof, un cours et une classe)
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  classId:   { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true },
  courseId:  { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true }
}, { timestamps: true });

export default mongoose.model('Eval', evalSchema);
