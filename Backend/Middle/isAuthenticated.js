import jwt from 'jsonwebtoken';

const isAuthenticated = async (req, res, next) => {
    try {
        // Get token from Authorization header
        const token = req.headers.authorization?.split(' ')[1]; // "Bearer <token>"

        if (!token) {
            return res.status(401).json({
                message: "Token not found. Please log in again.",
                success: false,
            });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        // If token is valid, attach decoded user info to the request
        req.userId = decoded.userId;
        next();
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({
                message: "Token has expired. Please log in again.",
                success: false,
            });
        }
        console.error("Authentication Error:", error);
        return res.status(500).json({
            message: "An error occurred while verifying the token.",
            success: false,
        });
    }
};

export default isAuthenticated;
