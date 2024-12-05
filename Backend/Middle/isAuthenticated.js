import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
    try {
        // Retrieve token from cookies
        const token = req.cookies?.token; 
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Authentication failed. No token provided.",
            });
        }

        // Verify token using your secret key
        const decoded = jwt.verify(token, process.env.SECRET_KEY); // Replace `process.env.SECRET_KEY` with your actual secret key or environment variable
        if (!decoded) {
            return res.status(401).json({
                success: false,
                message: "Authentication failed. Invalid token.",
            });
        }

        // Attach user information to the request
        req.user = decoded; // This will typically include userId and other details from your token
        next(); // Proceed to the next middleware/handler
    } catch (error) {
        console.error("Error in authentication middleware:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error during authentication.",
        });
    }
};

export default isAuthenticated;
