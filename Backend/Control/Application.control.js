import { Application } from "../models/application.models.js";
import { Job } from "../models/jobs.models.js";

export const applyJob = async (req, res) => {
    try {
        const userId = req.user._id;  // Extract user ID from the authenticated user
        const jobId = req.params.id;   // Get the job ID from the URL params

        // Check if job ID is provided
        if (!jobId) {
            return res.status(400).json({
                message: "Job ID is required.",
                success: false
            });
        }

        // Check if the job exists
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            });
        }

        // Check if the user has already applied to this job
        const existingApplication = await Application.findOne({ job: jobId, applicant: userId });
        if (existingApplication) {
            return res.status(400).json({
                message: "You have already applied for this job",
                success: false
            });
        }

        // Create a new application
        const newApplication = await Application.create({
            job: jobId,
            applicant: userId,
        });

        // Add the application to the job's list of applications
        job.applications.push(newApplication._id);
        await job.save();

        return res.status(201).json({
            message: "Job applied successfully.",
            success: true,
            application: newApplication
        });
    } catch (error) {
        console.log("Error in applyJob function:", error);
        return res.status(500).json({
            message: "Internal Server Error.",
            error: error.message,
            success: false,
        });
    }
};
export const getAppliedJobs = async (req, res) => {
    try {
        const userId = req.id;  // User ID from JWT token (decoded)

        // Fetch all applications for the user and populate job and company details
        const application = await Application.find({ applicant: userId }).sort({ createdAt: -1 }).populate({
            path: 'job',
            options: { sort: { createdAt: -1 } },
            populate: {
                path: 'company',
                options: { sort: { createdAt: -1 } },
            }
        });

        // If no applications are found, return a 404
        if (!application || application.length === 0) {
            return res.status(404).json({
                message: "No Applications",
                success: false
            });
        }

        return res.status(200).json({
            application,
            success: true
        });
    } catch (error) {
        console.error("Error in getAppliedJobs function:", error);
        return res.status(500).json({
            message: "Internal Server Error.",
            error: error.message,
            success: false
        });
    }
};
export const getApplicants = async (req, res) => {
    try {
        const jobId = req.params.id;  // Extract job ID from URL params

        // Find the job and populate the list of applications and applicants
        const job = await Job.findById(jobId).populate({
            path: 'applications',
            options: { sort: { createdAt: -1 } },
            populate: {
                path: 'applicant'
            }
        });

        if (!job) {
            return res.status(404).json({
                message: 'Job not found.',
                success: false
            });
        }

        return res.status(200).json({
            job,
            success: true
        });
    } catch (error) {
        console.error("Error in getApplicants function:", error);
        return res.status(500).json({
            message: "Internal Server Error.",
            error: error.message,
            success: false
        });
    }
};
export const updateStatus = async (req, res) => {
    try {
        const { status } = req.body;  // Get status from request body
        const applicationId = req.params.id;  // Get application ID from URL params

        // Validate status
        if (!status) {
            return res.status(400).json({
                message: 'Status is required',
                success: false
            });
        }

        // Find the application by ID
        const application = await Application.findById(applicationId);
        if (!application) {
            return res.status(404).json({
                message: "Application not found.",
                success: false
            });
        }

        // Update the status of the application
        application.status = status.toLowerCase();  // Ensure the status is lowercase
        await application.save();

        return res.status(200).json({
            message: "Status updated successfully.",
            success: true
        });
    } catch (error) {
        console.error("Error in updateStatus function:", error);
        return res.status(500).json({
            message: "Internal Server Error.",
            error: error.message,
            success: false
        });
    }
};