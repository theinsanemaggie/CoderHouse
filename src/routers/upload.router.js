import { Router } from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = Router();

// Configuración de Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.resolve(__dirname, "../public/uploads"); 
    console.log("Multer guardando archivo en:", uploadPath); 
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname);
    const filename = `${Date.now()}-${file.originalname.replace(extension, "")}${extension}`;
    cb(null, filename);
  }
});

const upload = multer({ storage: storage });

// Ruta para subir un solo archivo de imagen
router.post("/", upload.single("imagen"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No se ha subido ningún archivo." });
  }

  res.status(200).json({ url: `/uploads/${req.file.filename}` });
});

export default router;