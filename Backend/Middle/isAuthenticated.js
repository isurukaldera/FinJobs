import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token; // Ensure token is in cookies
        if (!token) {
            return res.status(401).json({ message: "User not authenticated", success: false });
        }
        
        const decoded = await jwt.verify(token, process.env.SECRET_KEY); // Decode the JWT token using the secret key
        if (!decoded) {
            return res.status(401).json({ message: "Invalid token", success: false });
        }
        
        req.id = decoded.userId; // Attach user ID to request
        next(); // Continue to the next middleware or route handler
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error", success: false });
    }
};

  

export default isAuthenticated;