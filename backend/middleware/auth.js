import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  const { token } = req.headers;

  if (!token) {
    return res.status(401).json({ success: false, message: "Not Authorized, Login Again" });
  }

  try {
    console.log("Received Token:", token);
    console.log("JWT_SECRET in backend:", process.env.JWT_SECRET);

    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = token_decode.id;
    
    next();
  } catch (error) {
    console.log("JWT Verification Error:", error);
    res.status(401).json({ success: false, message: "Invalid Token" });
  }
};

export default authMiddleware;
