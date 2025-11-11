import util from 'util';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { assetsUrl ,folderName} from "../Config.js";


const uploadPath = path.resolve(assetsUrl, '../', folderName);

// Ensure the assets folder exists
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

// Extract file extension
const getExtension = (filename) => {
  const dotIndex = filename.lastIndexOf('.');
  return dotIndex !== -1 ? filename.substring(dotIndex + 1) : '';
};

// Define Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const ext = getExtension(file.originalname);
    const timestamp = Date.now();
    const uniqueName = `${ext}_${timestamp}.${ext}`;
    cb(null, uniqueName);
  },
});

// Multer config
const uploadFile = multer({
  storage,
  limits: { fileSize: 25 * 1024 * 1024 }, // 5MB
}).array('images');

const uploadFileMiddleware = util.promisify(uploadFile);

export default uploadFileMiddleware;
