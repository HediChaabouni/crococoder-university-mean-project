import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  tel: {
    type: String,
    required: true,
    unique: true   // ✅ unicité du téléphone
  },
  address: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },

  // Rôle
  role: {
    type: String,
    enum: ['student', 'teacher', 'parent', 'admin'],
    required: true
  },

  // Champs spécifiques Teacher
  teacherSpecialty: {
    type: String,
    required: function () { return this.role === 'teacher'; }
  },
  teacherCV: {
    type: String,
    required: function () { return this.role === 'teacher'; }
  },
  teacherPhoto: {
    type: String,
    required: function () { return this.role === 'teacher'; }
  },
  teacherValidated: { type: Boolean, default: false }, // ✅ par défaut teacher non validé
  studentIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // pour teacher
  
  // Champs spécifiques Student
  studentPhoto: {
    type: String,
    required: function () { return this.role === 'student'; }
  },
  teacherIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // pour student
  parentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // pour student
  
  // Champs spécifiques Parent
  childTel: {
    type: String,
    required: function () { return this.role === 'parent'; },
  },
  childNumber: {
    type: Number,
    default: 0   // ✅ on le calcule en BE, pas besoin de required strict
  },
  childIds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],

  // Relations communes
  courseIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
  classIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Class' }],
  evalIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Eval' }]
}, { timestamps: true });

export default mongoose.model('User', userSchema);

