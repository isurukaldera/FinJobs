import jwt from "jsonwebtoken";

const isAuthenticated = (req, res, next) => {
    const authHeader = req.headers.authorization; // Get the Authorization header
    console.log("Authorization Header:", authHeader); // Log the header

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ success: false, message: "Token missing or invalid" });
    }

    const token = authHeader.split(" ")[1]; // Extract the token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
        req.userId = decoded.id; // Attach the decoded user ID to the request
        next();
    } catch (error) {
        console.error("Token verification failed:", error);
        res.status(401).json({ success: false, message: "Invalid token" });
    }
};

export default isAuthenticated;
