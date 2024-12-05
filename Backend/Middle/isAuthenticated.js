import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.header("Authorization")?.replace("Bearer ", ""); // Support token in header
        if (!token) {
            return res.status(401).json({
                message: "User not authenticated",
                success: false,
            });
        }

        const decode = jwt.verify(token, process.env.SECRET_KEY); // Verify token
        if (!decode || !decode.userId) {
            return res.status(401).json({
                message: "Invalid token",
                success: false,
            });
        }

        req.id = decode.userId; // Attach userId to the request object
        next(); // Move to the next middleware/route
    } catch (error) {
        console.error("Authentication error:", error);
        return res.status(401).json({
            message: "Authentication failed",
            success: false,
        });
    }
};

export default isAuthenticated;
