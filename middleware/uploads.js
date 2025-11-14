
import multer from "multer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let folder = "uploads/others"; // Default

    if (req.originalUrl.includes("/clients")) folder = "uploads/clients";
    else if (req.originalUrl.includes("/teammanagement")) folder = "uploads/management";
    else if (req.originalUrl.includes("/committees")) folder = "uploads/commiteemember";
    // In your uploads.js middleware
    if (req.originalUrl.includes("/committees")) folder = "uploads/committeemember"; // Fixed spelling
    else if (req.originalUrl.includes("/community")) folder = "uploads/community";
    else if (req.originalUrl.includes("/certificates")) folder = "uploads/certificates";
    else if (req.originalUrl.includes("/contact")) folder = "uploads/contact";
    else if (req.originalUrl.includes("/services")) folder = "uploads/services";
    else if (req.originalUrl.includes("/products")) folder = "uploads/products";
    else if (req.originalUrl.includes("/sliders")) folder = "uploads/sliders";

    const fullPath = path.join(__dirname, "..", folder);
    
    // Ensure folder exists
    fs.mkdirSync(fullPath, { recursive: true });

    cb(null, fullPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });
export default upload;
