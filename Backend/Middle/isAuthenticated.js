import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token; // Get token from cookies
        if (token) {
            const decode = await jwt.verify(token, process.env.SECRET_KEY);
            if (decode) {
                req.userId = decode.userId; // Populate user information
            }
        }
        next(); // Proceed regardless of token presence
    } catch (error) {
        console.error("Authentication Error:", error);
        next(); // Don't block the request on authentication failure
    }
};

export default isAuthenticated;
