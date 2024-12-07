import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../DataU/datauri.js";
import cloudinary from "../DataU/cloudinary.js";

export const register = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, password, role } = req.body;

        if (!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        }

        if (req.file) {
            const fileUri = getDataUri(req.file);
            const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({
                    message: "User already exists with this email.",
                    success: false,
                });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = await User.create({
                fullname,
                email,
                phoneNumber,
                password: hashedPassword,
                role,
                profile: {
                    profilePhoto: cloudResponse.secure_url,
                }
            });

            return res.status(201).json({
                message: "Account created successfully.",
                success: true,
                user: newUser
            });
        } else {
            return res.status(400).json({
                message: "Profile photo is required.",
                success: false
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error.", success: false });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        if (!email || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false,
            });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false,
            });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false,
            });
        }

        if (role !== user.role) {
            return res.status(400).json({
                message: "Account doesn't exist with current role.",
                success: false,
            });
        }

        // Generate JWT token
        const tokenData = { userId: user._id, role: user.role };
        const token = jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

        // Prepare user data for response
        const userResponse = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile,
        };
        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpsOnly: true, sameSite: 'strict' }).json({
            message: `Welcome back ${user.fullname}`,
            user,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

export const logout = (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logged out successfully.",
            success: true
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error.", success: false });
    }
};

export const updateProfile = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, bio, skills } = req.body;
        const userId = req.id;
        let user = await User.findById(userId);

        if (!user) {
            return res.status(400).json({
                message: "User not found.",
                success: false
            });
        }

        if (req.file) {
            const fileUri = getDataUri(req.file);
            const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
            user.profile.resume = cloudResponse.secure_url;
            user.profile.resumeOriginalName = req.file.originalname;
        }

        user.fullname = fullname || user.fullname;
        user.email = email || user.email;
        user.phoneNumber = phoneNumber || user.phoneNumber;
        user.profile.bio = bio || user.profile.bio;
        user.profile.skills = skills ? skills.split(",") : user.profile.skills;

        await user.save();

        const updatedUser = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        };

        return res.status(200).json({
            message: "Profile updated successfully.",
            user: updatedUser,
            success: true
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error.", success: false });
    }
};
