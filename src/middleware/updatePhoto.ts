import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { Request } from 'express';



// Buat direktori kalau belum ada
const uploadDir = path.join(__dirname, '..', '..', 'public/uploads/users');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Validasi sebelum simpan → dijalankan sebelum file di-save
const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg'];

const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true); // ✅ Lolos validasi
    } else {
      const error = new Error('Please upload only JPG or PNG images') as any;
      error.code = 'INVALID_FILE_TYPE'; // 👈 Custom error code
      cb(error); // ❌ Trigger error handler
    }
  };
  
// Konfigurasi penyimpanan
const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, uploadDir);
  },
  filename: function (_req, file, cb) {
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  }
});

export const updatePhoto = multer({
  storage,
  limits: {
     fileSize: 5 * 1024 * 1024,
    files : 1
    },
  fileFilter
}).single('photo');
