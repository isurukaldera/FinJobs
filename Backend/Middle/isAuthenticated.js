import jwt from "jsonwebtoken";

const isAuthenticated = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1]; // Get token from the header

        if (!token) {
            return res.status(401).json({
                message: "Authorization token missing",
                success: false,
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY); // Verify the token using the secret key
        req.id = decoded.userId; // Attach userId to the request object

        next(); // Continue to the next middleware/handler
    } catch (error) {
        console.error("Token verification failed:", error);
        return res.status(401).json({
            message: "Invalid or expired token",
            success: false,
        });
    }
};

export default isAuthenticated;
