    import jwt from "jsonwebtoken";

    const isAuthenticated = (req, res, next) => {
        try {
            const token = req.cookies.token;
    
            if (!token) {
                return res.status(401).json({
                    message: "User not authenticated",
                    success: false,
                });
            }
    
            // Decode the token synchronously
            const decode = jwt.verify(token, process.env.SECRET_KEY); 
    
            console.log("Decoded Token:", decode); // Optional: Log the decoded token
    
            if (!decode) {
                return res.status(401).json({
                    message: "Invalid token",
                    success: false,
                });
            }
    
            // Attach user ID to the request for further use
            req.id = decode.userId;
    
            // Proceed to the next middleware or route handler
            next();
        } catch (error) {
            console.error("Authentication Error:", error.message || error); // Improved error logging
    
            // Return a more generic error message if the token is invalid or any other error occurs
            return res.status(500).json({
                message: "Internal server error",
                success: false,
            });
        }
    };
    export default isAuthenticated;