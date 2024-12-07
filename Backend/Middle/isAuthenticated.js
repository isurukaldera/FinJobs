const isAuthenticated = async (req, res, next) => {
    try {
        console.log("Cookies:", req.cookies);  // Log cookies received in the request
        const token = req.cookies.token;

        if (!token) {
            console.log("No token found");
            return res.status(401).json({
                message: "User not authenticated",
                success: false,
            });
        }

        const decode = await jwt.verify(token, process.env.SECRET_KEY);
        if (!decode) {
            console.log("Invalid token");
            return res.status(401).json({
                message: "Invalid token",
                success: false,
            });
        }

        req.id = decode.userId;
        console.log("Authenticated user ID:", req.id);
        next();
    } catch (error) {
        console.error("Authentication error:", error);
        res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
};
