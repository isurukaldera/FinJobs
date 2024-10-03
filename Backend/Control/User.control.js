import { User } from '../models/user.models.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, password, role } = req.body;


        if (!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                message: "Information is missing",
                success: false
            });
        }


        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: "User already exists",
                success: false
            });
        }


        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role
        });


        await newUser.save();

        return res.status(201).json({
            message: "User registered successfully",
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server error",
            success: false,
            error: error.message
        });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;


        if (!email || !password || !role) {
            return res.status(400).json({
                message: "Email, password, and role are required",
                success: false
            });
        }


        let user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }


        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid credentials",
                success: false
            });
        }


        if (role !== user.role) {
            return res.status(400).json({
                message: "Account doesn't exist with the current role",
                success: false
            });
        }

        // Generate JWT token
        const tokenData = { userId: user._id };
        const token = jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });


        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile // Assuming profile exists in your User model
        };

        // Set token in cookie and return success response
        return res
            .status(200)
            .cookie('token', token, {
                maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day
                httpOnly: true,
                sameSite: 'strict'
            })
            .json({
                message: `Welcome back ${user.fullname}`,
                success: true,
                user
            });

    } catch (error) {
        return res.status(500).json({
            message: "Server error",
            success: false,
            error: error.message
        });
    }
};
export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logged out successfully.",
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

export const updateProfile = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, bio, skills } = req.body;
        const file = req.file;
         

        let skillsArray;
        if (skills) {
            skillsArray = skills.split(",");
        }
        const userId = req.id;
        
        let user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: "User not found.",
                success: false
            });
        }


        if (fullname) user.fullname = fullname;
        if (email) user.email = email;
        if (phoneNumber) user.phoneNumber = phoneNumber;
        if (bio) user.bio = bio;
        if (skills) user.skills = skillsArray;



        await user.save();

        return res.status(200).json({
            message: "Profile updated successfully",
            success: true,
            user: {
                _id: user._id,
                fullname: user.fullname,
                email: user.email,
                phoneNumber: user.phoneNumber,
                role: user.role,
                profile: user.profile
            }
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error updating profile",
            success: false,
            error: error.message 
        });
    }
};