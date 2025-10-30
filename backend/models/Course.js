import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  courseTitle: { type: String, required: true },
  courseLevel: { type: String, required: true },       // Ex: Licence 1, Master 2
  courseDescription: { type: String, required: true },
  courseImageUrl: { type: String },

  // Relations
  teacherIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false }],
  studentIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false }],
  classIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: false }]
}, { timestamps: true });

export default mongoose.model('Course', courseSchema);
