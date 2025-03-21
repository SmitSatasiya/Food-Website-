import express from "express";
import { loginAdmin, registerAdmin, approveAdmin, getPendingRegistrations } from "../controllers/adminController.js";
import isMainAdmin from "../middleware/isMainAdmin.js"; 

const adminRouter = express.Router();

adminRouter.post("/register", registerAdmin);
adminRouter.post("/login", loginAdmin);
adminRouter.get("/pending", getPendingRegistrations); 
adminRouter.post("/approve/:id", approveAdmin);

export default adminRouter;
