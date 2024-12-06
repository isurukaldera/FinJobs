import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
    try {
      // Check for the token in cookies
      const token = req.cookies.token;
      if (!token) {
        return res.status(401).json({
          message: "User not authenticated. Token missing.",
          success: false,
        });
      }
  
      // Verify the token using the secret key
      try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        console.log("Decoded Token:", decoded);
  
        if (!decoded || !decoded.userId) {
          return res.status(401).json({
            message: "Invalid token. Decoded payload is missing userId.",
            success: false,
          });
        }
  
        // Attach the user ID to the request object for further use
        req.id = decoded.userId;
        next();
      } catch (err) {
        console.error("JWT Verification Error:", err.message || err);
        return res.status(401).json({
          message: "Invalid token. Token verification failed.",
          success: false,
        });
      }
    } catch (error) {
      // Handle unexpected errors
      console.error("Authentication Middleware Error:", error.message || error);
      return res.status(500).json({
        message: "Internal server error during authentication.",
        success: false,
      });
    }
  };

export default isAuthenticated;