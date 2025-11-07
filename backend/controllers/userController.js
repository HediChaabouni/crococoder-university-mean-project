// backend/controllers/userController.js
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

/* ================================
   CREATE (Signup d’un utilisateur)
   ================================ */
export const createUser = async (req, res) => {
  console.log('✅ Files received:', req.files);
  console.log('✅ Body received:', req.body);

  try {
    if (!req.files) req.files = {}; // 🛡️ sécurise le flux multipart
    // ✅ Déterminer le rôle
    let role = req.body.role;
    if (!role) {
      if (req.originalUrl.includes('signup-teacher')) role = 'teacher';
      else if (req.originalUrl.includes('signup-student')) role = 'student';
      else if (req.originalUrl.includes('signup-parent')) role = 'parent';
      else if (req.originalUrl.includes('signup-admin')) role = 'admin';
    }
    // 🔒 Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Pour les parents : récupérer le numéro de téléphone de l’enfant
    const childTel = req.body.childTel;

    // ✅ Normaliser tous les chemins de fichiers uploadés (corrige les \\ Windows)
    const normalize = (filePath) => filePath ? filePath.replace(/\\/g, '/') : null;

    // Créer le nouvel utilisateur
    const newUser = new User({
      firstName: req.body.firstName || null,
      lastName: req.body.lastName || null,
      email: req.body.email || null,
      tel: req.body.tel || null,
      address: req.body.address || null,
      password: hashedPassword,
      role: role || null,

      // Champs Teacher
      teacherSpecialty: req.body.teacherSpecialty || null,
      teacherCV: normalize(req.files?.teacherCV?.[0]?.path),
      teacherPhoto: normalize(req.files?.teacherPhoto?.[0]?.path),
      teacherValidated: req.body.teacherValidated !== undefined ? req.body.teacherValidated : null,

      // Champs Student
      studentPhoto: normalize(req.files?.studentPhoto?.[0]?.path),

      // Champs Parent
      childTel: role === 'parent' ? childTel || null : null,
      childIds: [],
      childNumber: 0 || null,
    });

    // ⚡ Cas particulier : inscription d’un parent
    if (role === 'parent') {
      if (!childTel) {
        return res.status(400).json({ message: 'Parent must provide a childTel' });
      }
      const child = await User.findOne({ tel: childTel, role: 'student' });
      if (!child) {
        return res.status(400).json({ message: 'No student found with this phone number' });
      }
      newUser.childIds.push(child._id);
      newUser.childNumber = newUser.childIds.length;
    }

    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    if (error.code === 11000) {
      if (error.keyValue?.email) return res.status(400).json({ message: 'Email already exists' });
      if (error.keyValue?.tel) return res.status(400).json({ message: 'Tel already exists' });
    }
    res.status(400).json({ message: error.message });
  }
};

/* ================================
   LOGIN (avec JWT)
   ================================ */
export const loginUser = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // Vérifier si user existe
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    // Vérifier le mot de passe
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    // Vérifier le rôle si fourni
    if (role && user.role !== role) {
      return res.status(400).json({ message: 'Role mismatch for user' });
    }

    // Générer JWT
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // ⚡ Sanitize pour ne pas renvoyer le password
    const { password: _, ...safeUser } = user.toObject();
    res.json({ message: 'Login successful', token, user: safeUser });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

/* ================================
   READ ALL USERS
   ================================ */

export const getUsers = async (req, res) => {
  try {
    const { role } = req.query;
    const filter = role ? { role } : {};
    const users = await User.find(filter);
    res.json(users);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

/* ================================
   READ ONE USER BY ID
   ================================ */
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('childIds', 'firstName lastName email tel');
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (user.role === 'parent') {
      user.childNumber = user.childIds.length;
    }

    res.json(user);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

/* ================================
   READ ONE USER BY ROLE
   ================================ */
// ✅ version ESM compatible avec "import { ... } from ..."
export const getUsersByRole = async (req, res) => {
  try {
    const { role } = req.params;
    const users = await User.find({ role });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users by role', error });
  }
};

// ✅ Récupère les students d’un teacher
export const getStudentsByTeacher = async (req, res) => {
  try {
    const teacherId = req.params.id;
    const students = await User.find({ teacherIds: teacherId, role: 'student' });
    res.status(200).json(students);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching students', error: err });
  }
};

// ✅ Récupère les teachers d’un student
export const getTeachersByStudent = async (req, res) => {
  try {
    const studentId = req.params.id;
    // Vérifier que l’étudiant existe
    const student = await User.findById(studentId);
    if (!student || student.role !== 'student') {
      return res.status(404).json({ message: 'Student not found' });
    }
    // Trouver les enseignants associés à cet étudiant
    const teachers = await User.find({ studentIds: studentId, role: 'teacher' });
    res.status(200).json(teachers);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching teachers', error: err });
  }
};




/* ================================
   GET – Enfants d’un parent
   ================================ */
export const getChildrenByParent = async (req, res) => {
  try {
    const parentId = req.params.id;
    const parent = await User.findById(parentId);

    if (!parent || parent.role !== 'parent') {
      return res.status(403).json({ message: 'Access denied or invalid parent.' });
    }

    // Trouver les enfants dont le parentId correspond
    const children = await User.find({ _id: { $in: parent.childIds }, role: 'student' })
      .populate({
        path: 'classIds',
        select: 'className classYear'
      });

    res.status(200).json(children);
  } catch (error) {
    console.error('❌ Error fetching children:', error);
    res.status(500).json({ message: 'Server error while fetching children.' });
  }
};

/* ================================
   UPDATE USER
   ================================ */
export const updateUser = async (req, res) => {
  try {
    const allowedFields = {
      firstName: req.body.firstName || null,
      lastName: req.body.lastName || null,
      email: req.body.email || null,
      tel: req.body.tel || null,
      address: req.body.address || null,
      password: req.body.password ? await bcrypt.hash(req.body.password, 10) : null,

      // Teacher
      teacherSpecialty: req.body.teacherSpecialty || null,
      teacherCV: normalize(req.files?.teacherCV?.[0]?.path),
      teacherPhoto: normalize(req.files?.teacherPhoto?.[0]?.path),
      teacherValidated: req.body.teacherValidated !== undefined ? req.body.teacherValidated : null,

      // Student
      studentPhoto: normalize(req.files?.studentPhoto?.[0]?.path),

    };

    const updatedUser = await User.findByIdAndUpdate(req.params.id, allowedFields, { new: true });
    if (!updatedUser) return res.status(404).json({ message: 'User not found' });

    res.json(updatedUser);
  } catch (e) {
    if (e.code === 11000) {
      if (e.keyValue?.email) return res.status(400).json({ message: 'Email already exists' });
      if (e.keyValue?.tel) return res.status(400).json({ message: 'Tel already exists' });
    }
    res.status(400).json({ message: e.message });
  }
};

/* ================================
   DELETE USER
   ================================ */
export const deleteUser = async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'User not found' });

    // ⚡ Si on supprime un Student → mise à jour des parents liés
    if (deleted.role === 'student') {
      await User.updateMany(
        { childIds: deleted._id },
        { $pull: { childIds: deleted._id } }
      );
    }

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete all users (use with caution!)
export const deleteAllUsers = async (req, res) => {
  try {
    await User.deleteMany({});
    res.json({ message: '✅ All users deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ================================
   SEARCH USER (child by parent)
   ================================ */
export const searchChild = async (req, res) => {
  try {

    const { query = '', parentId } = req.query;

    if (!query.trim()) {
      const ownChildren = await User.find({ _id: { $in: parent.childIds } })
        .select('firstName lastName tel parentId');
      return res.json(ownChildren);
    }

    if (!parentId) return res.status(401).json({ message: 'Unauthorized: parentId missing' });

    // 1️⃣ Vérifier que le parent est légitime
    const parent = await User.findById(parentId);
    if (!parent || parent.role !== 'parent') {
      return res.status(403).json({ message: 'Access denied: invalid parent' });
    }

    // 2️⃣ Construire la recherche
    const regex = new RegExp(query, 'i');
    const allMatches = await User.find({
      role: 'student',
      $or: [
        { tel: query },
        { firstName: regex },
        { lastName: regex }
      ]
    }).select('firstName lastName tel parentId'); // on limite les champs pour alléger la réponse

    // 3️⃣ Annoter les résultats
    const annotated = allMatches.map((child) => ({
      ...child.toObject(),
      alreadyLinked:
        child.parentId?.toString() === parent._id.toString()
          ? 'you'
          : child.parentId
            ? 'other'
            : null
    }));

    // 4️⃣ Retourner les enfants triés :
    //    - ceux déjà à toi en premier,
    //    - puis ceux libres,
    //    - puis ceux déjà pris.
    const ordered = [
      ...annotated.filter(c => c.alreadyLinked === 'you'),
      ...annotated.filter(c => !c.alreadyLinked),
      ...annotated.filter(c => c.alreadyLinked === 'other')
    ];

    res.json(ordered);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};


// ========================================================
// 🔗 Link a child to a parent (by ID or by Tel)
// ========================================================

export const linkChild = async (req, res) => {
  try {
    const { parentId, childId } = req.body;

    if (!parentId || !childId) {
      return res.status(400).json({ message: 'parentId and childId are required' });
    }

    // 1️⃣ 2️⃣ Vérifier que le parent et enfant existent et ont bien les rôles "parent" et "student"
    const [parent, child] = await Promise.all([
      User.findById(parentId),
      User.findById(childId)
    ]);

    if (!parent || parent.role !== 'parent') {
      return res.status(403).json({ message: 'Invalid parent' });
    }

    if (!child || child.role !== 'student') {
      return res.status(404).json({ message: 'Student not found' });
    }

    // 3️⃣ ✅ Protection : si l’enfant est déjà lié à un autre parent
    if (child.parentId && !child.parentId.equals(parent._id)) {
      return res.status(409).json({ message: 'This student is already linked to another parent' });
    }

    // 4️⃣ (Facultatif mais utile) Si le parent a déjà ce child dans ses childIds
    const alreadyLinked = parent.childIds.some(
      (id) => id.toString() === child._id.toString()
    );
    if (alreadyLinked) {
      return res.status(200).json({ message: 'This student is already linked to you' });
    }

    // 5️⃣ ✅ Tout est bon → mise à jour des deux côtés
    await Promise.all([
      User.findByIdAndUpdate(parent._id, { $addToSet: { childIds: child._id } }),
      User.findByIdAndUpdate(child._id, { parentId: parent._id })
    ]);

    res.json({
      message: 'Child successfully linked to parent',
      linkedChild: {
        _id: child._id,
        firstName: child.firstName,
        lastName: child.lastName
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
