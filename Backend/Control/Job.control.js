import { Job } from "../models/jobs.models.js";


export const postJob = async (req, res) => {
    try {
        const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body;
        const userId = req.userId; // Optional now

        if (!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId) {
            return res.status(400).json({
                message: "Something is missing.",
                success: false
            });
        }

        // You can either reject the request if `userId` is mandatory:
        if (!userId) {
            return res.status(401).json({
                message: "User authentication is required to post a job.",
                success: false
            });
        }

        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(","),
            salary: Number(salary),
            location,
            jobType,
            experienceLevel: experience,
            position,
            company: companyId,
            created_by: userId || null, // Null if no user ID
        });

        return res.status(201).json({
            message: "New job created successfully.",
            job,
            success: true
        });
    } catch (error) {
        console.error("Error in postJob:", error);
        res.status(500).json({
            message: "An error occurred while creating the job.",
            success: false
        });
    }
};


export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        console.log("Keyword received:", keyword);

        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
            ]
        };
        console.log("MongoDB Query:", query);

        const jobs = await Job.find(query).populate({
            path: "company"
        }).sort({ createdAt: -1 });

        console.log("Jobs fetched:", jobs);

        if (!jobs) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            });
        };

        return res.status(200).json({
            jobs,
            success: true
        });
    } catch (error) {
        console.error("Error in getAllJobs:", error);
    }
};

export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path:"applications"
        });
        if (!job) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        return res.status(200).json({ job, success: true });
    } catch (error) {
        console.log(error);
    }
}

export const getAdminJobs = async (req, res) => {
    try {
        const adminId = req.userId; // Optional now

        if (!adminId) {
            return res.status(401).json({
                message: "User authentication is required to access admin jobs.",
                success: false
            });
        }

        const jobs = await Job.find({ created_by: adminId }).populate({
            path: "company",
        }).sort({ createdAt: -1 });

        if (!jobs || jobs.length === 0) {
            return res.status(404).json({
                message: "No jobs found for the admin.",
                success: false
            });
        }

        return res.status(200).json({
            jobs,
            success: true
        });
    } catch (error) {
        console.error("Error in getAdminJobs:", error);
        res.status(500).json({
            message: "An error occurred while fetching admin jobs.",
            success: false
        });
    }
};

