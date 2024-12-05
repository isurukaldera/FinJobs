import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => next();
    
const authenticate = (req, res, next) => {
    const token = req.cookies.token || req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ message: "Authentication required" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;  // Attach decoded user to request object
        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid token" });
    }
};

export default isAuthenticated;