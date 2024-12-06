import jwt from "jsonwebtoken";

const isAuthenticated = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]; // Extract token from "Bearer <token>"
    if (!token) {
        return res.status(401).json({ success: false, message: "No token provided." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
        req.userId = decoded.id; // Attach user info to request
        next(); // Proceed to next middleware/controller
    } catch (err) {
        console.error("Token verification failed:", err);
        res.status(401).json({ success: false, message: "Invalid token." });
    }
};

export default isAuthenticated;
