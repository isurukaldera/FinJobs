import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
    try {
        // Fetch the token from cookies or Authorization header
        const token =
            req.cookies.token || // From cookies
            req.headers.authorization?.split(' ')[1]; // From Authorization header

        // If token is missing, return unauthorized response
        if (!token) {
            return res.status(401).json({
                message: "User not authenticated",
                success: false,
            });
        }

        // Verify the token and decode the payload
        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        // Attach the decoded user ID to the request object
        req.id = decoded.userId;

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        console.error("Authentication error:", error.message || error);

        // Return a response indicating invalid or expired token
        return res.status(401).json({
            message: "Invalid or expired token",
            success: false,
        });
    }
};

export default isAuthenticated;
