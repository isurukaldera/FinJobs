import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token; // Get token from cookies
        console.log("Token received:", token); // Debug token existence

        if (!token) {
            console.log("Missing authentication token!");
            return res.status(401).json({
                message: "User not authenticated",
                success: false,
            });
        }

        const decoded = await jwt.verify(token, process.env.SECRET_KEY);
        console.log("Decoded token:", decoded); // Debug token decoding

        if (!decoded) {
            console.log("Invalid token!");
            return res.status(401).json({
                message: "Invalid token",
                success: false,
            });
        }

        console.log("User ID from token:", req.userId);
        req.userId = decoded.userId; // Attach userId to request
        next();
    } catch (error) {
        console.error("Authentication Error:", error);
        return res.status(500).json({
            message: "An error occurred while verifying the token.",
            success: false,
        });
    }
};

export default isAuthenticated;
