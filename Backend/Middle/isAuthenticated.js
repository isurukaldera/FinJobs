import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1]; // Retrieve token from Bearer scheme
        if (!token) {
          return res.status(401).json({ message: "No token provided", success: false });
        }
    
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.id = decoded.userId; // Set user ID for further use
        next();
      } catch (error) {
        console.error("Token verification failed:", error);
        return res.status(401).json({ message: "Invalid token", success: false });
      }
//         // Attach the user ID to the request object for further use
//         req.id = decoded.userId;
//         next();
//       } catch (err) {
//         console.error("JWT Verification Error:", err.message || err);
//         return res.status(401).json({
//           message: "Invalid token. Token verification failed.",
//           success: false,
//         });
//       }
//     } catch (error) {
//       // Handle unexpected errors
//       console.error("Authentication Middleware Error:", error.message || error);
//       return res.status(500).json({
//         message: "Internal server error during authentication.",
//         success: false,
//       });
//     }
  };

export default isAuthenticated;