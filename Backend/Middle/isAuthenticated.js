import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token; // Make sure cookies are being sent from the frontend
        if (!token) {
            return res.status(401).json({
                message: "User not authenticated",
                success: false,
            });
        }

        const decode = jwt.verify(token, process.env.SECRET_KEY);
        if (!decode || !decode.userId) {
            return res.status(401).json({
                message: "Invalid token",
                success: false,
            });
        }

        req.userId = decode.userId; // Ensure this is populated correctly
        next();
    } catch (error) {
        console.error("Authentication Error:", error);
        return res.status(500).json({
            message: "An error occurred while verifying the token.",
            success: false,
        });
    }
};


export default isAuthenticated;
