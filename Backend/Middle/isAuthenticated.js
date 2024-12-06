import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                message: "User not authenticated",
                success: false,
            });
        }
        console.log("SECRET_KEY", process.env.SECRET_KEY);  // Debugging step

            const decoded = await jwt.verify(token, process.env.SECRET_KEY);
            if (!decoded) {
                return res.status(401).json({
                    message: "Invalid token",
                    success: false
                });
            }

        req.id = decoded.userId; // Store the userId from the token in the request object
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}

export default isAuthenticated;