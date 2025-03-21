import adminModel from "../models/adminModel.js";
import bcrypt from "bcrypt";

// Function to create the main admin
const createMainAdmin = async () => {
  const exists = await adminModel.findOne({ email: 'smit@gmail.com' });
  
  if (!exists) {
    const mainAdmin = new adminModel({
      name: 'Smit',
      email: 'smit@gmail.com',
      password: await bcrypt.hash('1234@Admin', 10), 
      role: 'main',
      isApproved: true, 
    });
    
    await mainAdmin.save();
    console.log('Main admin created successfully!');
  } else {
    console.log('Main admin already exists.');
  }
};

export default createMainAdmin;
