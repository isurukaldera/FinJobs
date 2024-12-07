import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
    try {
      const token = req.cookies.token; // Make sure the token is in the cookies
      if (!token) {
        return res.status(401).json({
          message: "User not authenticated",
          success: false,
        });
      }
      const decoded = await jwt.verify(token, process.env.SECRET_KEY);
      if (!decoded) {
        return res.status(401).json({
          message: "Invalid token",
          success: false,
        });
      }
      req.id = decoded.userId; // Attach user id to the request
      next();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Server error" });
    }
  };
  

export default isAuthenticated;