import jwt from 'jsonwebtoken';

const isAuthenticated = async (req, res, next) => {
    try {
        // Retrieve token from either Authorization header or cookies
        const token = req.cookies?.token || req.headers['authorization']?.split(' ')[1];

        if (!token) {
            return res.status(401).json({
                message: "Authentication token is missing",
                success: false,
            });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        if (!decoded) {
            return res.status(401).json({
                message: "Invalid or expired token",
                success: false,
            });
        }

        // Attach user information to request object
        req.user = decoded;
        next(); // Pass control to the next middleware or route handler
    } catch (error) {
        console.error("Authentication Error:", error.message);
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                message: "Token has expired. Please log in again.",
                success: false,
            });
        } else if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                message: "Invalid token. Please log in again.",
                success: false,
            });
        }
        res.status(500).json({
            message: "Internal Server Error during authentication",
            success: false,
        });
    }
};

export default isAuthenticated;
