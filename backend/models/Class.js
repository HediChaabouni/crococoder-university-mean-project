import mongoose from 'mongoose';

const classSchema = new mongoose.Schema({
  className: { type: String, required: true },  // Ex: L1-Math, M2-Info
  classYear: { type: Number, required: true },  // Ex: 2024, 2025

  // Relations
  teacherIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false }],
  studentIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false }],
  courseIds:  [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: false }]
}, { timestamps: true });

export default mongoose.model('Class', classSchema);

