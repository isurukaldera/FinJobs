import jwt from 'jsonwebtoken';

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.headers?.authorization?.split(' ')[1]; // Get token from Authorization header
        if (!token) {
            return res.status(401).json({ message: "Authentication token is missing", success: false });
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY); // Verify the token
        if (!decoded) {
            return res.status(401).json({ message: "Invalid token", success: false });
        }

        req.user = decoded; // Attach user data to the request
        next();
    } catch (error) {
        console.error("Authentication Error:", error);
        return res.status(500).json({ message: "Internal Server Error during authentication", success: false });
    }
};
export default isAuthenticated;
