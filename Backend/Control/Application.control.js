import { Application } from "../models/application.models.js";
import { Job } from "../models/jobs.models.js";

export const applyJob = async (req, res) => {
    try {
        const userId = req.userId; 
        console.log("Incoming request for job ID:", jobId, "from user:", userId);
// Ensure req.userId is populated by middleware
        const jobId = req.params.id;

        console.log("User ID:", userId, "Job ID:", jobId); // Debug user and job IDs

        if (!userId) {
            return res.status(401).json({
                message: "Unauthorized: User ID is missing.",
                success: false,
            });
        }

        if (!jobId) {
            return res.status(400).json({
                message: "Job ID is required.",
                success: false,
            });
        }

        // Check if job exists
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({
                message: "Job not found.",
                success: false,
            });
        }

        // Check if the user has already applied
        const existingApplication = await Application.findOne({
            job: jobId,
            applicant: userId,
        });
        if (existingApplication) {
            return res.status(400).json({
                message: "You have already applied for this job.",
                success: false,
            });
        }

        // Create a new application
        const newApplication = await Application.create({
            job: jobId,
            applicant: userId,
            status: "pending",
        });

        // Link application to the job
        job.applications.push(newApplication._id);
        await job.save();

        console.log("Application created:", newApplication); // Debug application creation

        return res.status(201).json({
            message: "Job applied successfully.",
            success: true,
            application: newApplication,
        });
    } catch (error) {
        console.error("Error in applyJob:", error.message || error); // Log for debugging
        return res.status(500).json({
            message: "An error occurred while applying for the job.",
            success: false,
        });
    }
};


export const getAppliedJobs = async (req, res) => {
    try {
        const userId = req.userId;

        console.log("Fetching applied jobs for user ID:", userId); // Debug userId

        const applications = await Application.find({ applicant: userId })
            .sort({ createdAt: -1 })
            .populate({
                path: "job",
                populate: {
                    path: "company",
                },
            });

        if (!applications || applications.length === 0) {
            return res.status(404).json({
                message: "No applications found.",
                success: false,
            });
        }

        return res.status(200).json({
            applications,
            success: true,
        });
    } catch (error) {
        console.error("Error in getAppliedJobs:", error); // Log errors
        return res.status(500).json({
            message: "An error occurred while fetching applied jobs.",
            success: false,
        });
    }
};


export const getApplicants = async (req, res) => {
    try {
        const jobId = req.params.id;

        console.log("Fetching applicants for job ID:", jobId); // Debug jobId

        const job = await Job.findById(jobId).populate({
            path: "applications",
            populate: {
                path: "applicant",
            },
        });

        if (!job) {
            return res.status(404).json({
                message: "Job not found.",
                success: false,
            });
        }

        return res.status(200).json({
            applicants: job.applications,
            success: true,
        });
    } catch (error) {
        console.error("Error in getApplicants:", error); // Log errors
        return res.status(500).json({
            message: "An error occurred while fetching applicants.",
            success: false,
        });
    }
};


export const updateStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const applicationId = req.params.id;

        console.log("Updating status for application ID:", applicationId, "New status:", status); // Debug data

        const validStatuses = ["pending", "approved", "rejected"];
        if (!status || !validStatuses.includes(status.toLowerCase())) {
            return res.status(400).json({
                message: "Invalid status value.",
                success: false,
            });
        }

        const application = await Application.findById(applicationId);
        if (!application) {
            return res.status(404).json({
                message: "Application not found.",
                success: false,
            });
        }

        application.status = status.toLowerCase();
        await application.save();

        console.log("Status updated for application:", application); // Debug updated application

        return res.status(200).json({
            message: "Status updated successfully.",
            success: true,
        });
    } catch (error) {
        console.error("Error in updateStatus:", error); // Log errors
        return res.status(500).json({
            message: "An error occurred while updating the status.",
            success: false,
        });
    }
};

