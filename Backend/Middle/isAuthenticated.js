import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token; // Check for the token in cookies
        if (!token) {
            return res.status(401).json({
                message: "User not authenticated",
                success: false,
            });
        }
        const decode = await jwt.verify(token, process.env.SECRET_KEY); // Verify the token
        if (!decode) {
            return res.status(401).json({
                message: "Invalid token",
                success: false,
            });
        }
        console.log("Authenticated User ID:", req.id);
        req.id = decode.userId; // Add the user ID to the request object
        next(); // Proceed to the next middleware/route
    } catch (error) {
        console.error("Authentication error:", error);
        res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
};

export default isAuthenticated; // Export the middleware as default
