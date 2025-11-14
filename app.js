import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

// Route Imports
import aboutRoutes from "./routes/aboutRoutes.js";
import managementRoutes from "./routes/ManagemenTeamRoutes.js";
import certificateRoutes from "./routes/CertificatesRoutes.js";
import clientRoutes from "./routes/clientRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import communityRoutes from "./routes/communityRoutes.js";
import memberRoutes from "./routes/memberRoutes.js";
import committeeRoutes from "./routes/committeeCreationRoutes.js";
import memberRegistrationRoutes from "./routes/memberRegistrationRoutes.js";
import  newsRoutes from "./routes/newRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js"
// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/about", aboutRoutes);
app.use("/api/teammanagement", managementRoutes);
app.use("/api/certificates", certificateRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/products", productRoutes);
app.use("/api/community", communityRoutes);
app.use("/api/members", memberRoutes);
app.use("/api/committees", committeeRoutes);
app.use("/api/memberRegistration", memberRegistrationRoutes);
app.use("/api/news", newsRoutes);
export default app;
