import adminModel from "../models/adminModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Login Admin
const loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await adminModel.findOne({ email });

    if (!admin) {
      return res.json({ success: false, message: "Admin Doesn't Exist" });
    }

    if (!admin.isApproved) {
      return res.json({
        success: false,
        message: "Your account is pending approval.",
      });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.json({ success: false, message: "Invalid Credentials" });
    }

    const token = createToken(admin._id);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

// Register Admin
const registerAdmin = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const exists = await adminModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "Admin Already Exists" });
    }

    const newAdmin = new adminModel({
      name,
      email,
      password: await bcrypt.hash(password, 10),
      isApproved: false, // Set initial approval status to false
    });

    await newAdmin.save();
    res.json({
      success: true,
      message: "Admin registered successfully! Awaiting approval.",
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.json({ success: false, message: "Error registering admin" });
  }
};

// Get Pending Admin Registrations
const getPendingRegistrations = async (req, res) => {
  try {
    const pendingAdmins = await adminModel.find({ isApproved: false });
    res.json({ success: true, pendingAdmins });
  } catch (error) {
    console.error("Error fetching pending registrations:", error);
    res.json({
      success: false,
      message: "Error fetching pending registrations",
    });
  }
};

// Approve Admin Registration
const approveAdmin = async (req, res) => {
  const { id } = req.params;
  try {
    const adminToApprove = await adminModel.findById(id);
    if (!adminToApprove) {
      return res.json({ success: false, message: "Admin not found" });
    }

    adminToApprove.isApproved = true;
    await adminToApprove.save();

    res.json({ success: true, message: "Admin approved successfully!" });
  } catch (error) {
    console.error("Error approving admin:", error);
    res.json({ success: false, message: "Error approving admin" });
  }
};

export { loginAdmin, registerAdmin, approveAdmin, getPendingRegistrations };
