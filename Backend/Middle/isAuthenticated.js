import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
    try {
        // Get token from Authorization header (format: "Bearer <token>")
        const token = req.headers.authorization?.split(' ')[1]; // "Bearer <token>"

        console.log("Token received:", token); // Debug token existence

        if (!token) {
            console.log("Missing authentication token!");
            return res.status(401).json({
                message: "User not authenticated",
                success: false,
            });
        }

        // Verify the token using the secret key
        const decoded = await jwt.verify(token, process.env.SECRET_KEY);
        console.log("Decoded token:", decoded); // Debug token decoding

        if (!decoded) {
            console.log("Invalid token!");
            return res.status(401).json({
                message: "Invalid token",
                success: false,
            });
        }

        // Attach user data (like userId) to the request object
        req.userId = decoded.userId; // Ensure 'userId' is part of the token payload

        // Continue with the request
        next();
    } catch (error) {
        console.error("Authentication Error:", error);

        // If the token is expired or invalid, it will throw an error
        return res.status(500).json({
            message: "An error occurred while verifying the token.",
            success: false,
        });
    }
};

export default isAuthenticated;
