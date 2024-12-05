import jwt from 'jsonwebtoken';
const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies?.token; // Ensure cookies are sent
        if (!token) {
            return res.status(401).json({
                message: "User not authenticated",
                success: false,
            });
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        if (!decoded) {
            return res.status(401).json({
                message: "Invalid token",
                success: false,
            });
        }
        req.user = decoded; // Attach user data to the request
        next();
    } catch (error) {
        console.error("Authentication Error:", error);
        res.status(500).json({
            message: "Internal Server Error during authentication",
            success: false,
        });
    }
};


export default isAuthenticated;
