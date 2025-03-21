import adminModel from "../models/adminModel.js";

const isMainAdmin = async (req, res, next) => {
  const adminId = req.adminId; 
  const admin = await adminModel.findById(adminId);
  
  if (admin && admin.role === 'main') {
    next();
  } else {
    return res.status(403).json({ success: false, message: "Access denied: Not a main admin" });
  }
};

export default isMainAdmin;
