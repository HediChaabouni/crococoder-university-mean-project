import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import userRoutes from './routes/userRoutes.js';
import classRoutes from './routes/classRoutes.js';
import courseRoutes from './routes/courseRoutes.js';
import evalRoutes from './routes/evalRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

dotenv.config();

const app = express();

// ⚙️ Gestion des chemins pour les modules ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 🌐 Middlewares
app.use(cors());
app.use((req, res, next) => {
  if (req.originalUrl.startsWith('/api/users/signup')) next();
  else express.json()(req, res, next);
});
app.use(express.urlencoded({ extended: true }));

// 📂 Fichiers statiques — accès public au dossier uploads 
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ Activation des routes
app.use('/api/users', userRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/classes', classRoutes);
app.use('/api/evals', evalRoutes);
app.use('/api/admin', adminRoutes);

// 🗄️ Connexion MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB connected"))
.catch(err => console.error("❌ DB error:", err));

// 🧩 Test route
app.get('/', (_req, res) => {
  res.send('Hello from University API 🚀');
});

export default app;

