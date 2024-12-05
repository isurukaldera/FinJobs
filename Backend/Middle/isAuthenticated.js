import jwt from 'jsonwebtoken';

const isAuthenticated = async (req, res, next) => {
    try {
        // Get the token from the Authorization header (format: "Bearer <token>")
        const token = req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            return res.status(401).json({
                message: "User not authenticated, token missing",
                success: false,
            });
        }

        // Verify the token and handle potential errors (invalid or expired tokens)
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                const errorMessage = err.name === 'TokenExpiredError' ? "Token has expired" : "Invalid token";
                return res.status(401).json({
                    message: errorMessage,
                    success: false,
                });
            }

            // Attach user ID to the request object for use in subsequent routes
            req.id = decoded.userId;

            // Call next() to continue with the route handling
            next();
        });

    } catch (error) {
        console.error("Error during authentication:", error);

        // Return an error response if token verification fails
        return res.status(500).json({
            message: "Authentication failed",
            success: false,
        });
    }
};

export default isAuthenticated;
