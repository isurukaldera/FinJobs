import jwt from "jsonwebtoken";

const isAuthenticated = (req, res, next) => {
    const authHeader = req.headers.authorization; // Extract Authorization header

    if (!authHeader) {
        return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1]; // Get token after "Bearer "

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
        req.user = decoded; // Attach user info to the request object
        next(); // Allow the request to proceed
    } catch (error) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};



  

export default isAuthenticated;