import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
    // Try to get the token from the Authorization header or cookies
    const token = req.cookies.token || req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({
            message: "No token provided. Please log in.",
            success: false
        });
    }

    try {
        // Verify the token using your SECRET_KEY
        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        // Add the user data to the request (you can access it in your route)
        req.id = decoded.id;  // assuming the JWT contains the user ID in its payload

        next();  // Proceed to the next middleware or route handler
    } catch (error) {
        console.error(error);
        return res.status(401).json({
            message: "Invalid token. Please log in again.",
            success: false
        });
    }
};

export default isAuthenticated;
