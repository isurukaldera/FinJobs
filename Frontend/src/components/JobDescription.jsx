import React, { useEffect, useState } from 'react';
import { Badge } from '../../@/components/ui/badge';
import { Button } from './ui/button';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '../utils/constant';
import { setSingleJob } from '../redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

const JobDescription = () => {
    const params = useParams();
    const jobId = params.id;
    const { singleJob } = useSelector(store => store.job);
    const { user } = useSelector(store => store.auth);
    const isInitiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;

    const [isApplied, setIsApplied] = useState(isInitiallyApplied);

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
                console.log('Fetching Details ...');
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job));
                    const alreadyApplied = res.data.job.applications?.some(application => application.applicant === user?._id) || false;
                    setIsApplied(alreadyApplied);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchSingleJob();
    }, [jobId, dispatch, user?._id]);

    const applyJobHandler = async () => {
        if (isApplied) {
            console.log('User has already applied.');
            return;
        }
    
        console.log('Attempting to apply for job:', jobId);
    
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true });
            console.log('API Response:', res.data);
    
            if (res.data.success) {
                const updatedSingleJob = {
                    ...singleJob,
                    applications: [...singleJob.applications, { applicant: user?._id }],
                };
                dispatch(setSingleJob(updatedSingleJob));
                setIsApplied(true);
                toast.success(res.data.message);
            } else {
                toast.error(res.data.message || "Failed to apply.");
            }
        } catch (error) {
            if (error.response) {
                console.error("API error response:", error.response.data);
                toast.error(error.response.data?.message || "API error occurred");
            } else if (error.request) {
                console.error("API request failed:", error.request);
                toast.error("API request failed. Check server connection.");
            } else {
                console.error("Unknown error:", error.message);
                toast.error("An unknown error occurred.");
            }
        }
    };

    return (
        <div className='max-w-7xl mx-auto my-10 p-6 bg-white rounded-lg shadow-lg'>
            <div className='flex items-center justify-between mb-6'>
                <div>
                    <h1 className='font-bold text-2xl text-gray-800'>{singleJob?.title}</h1>
                    <div className='flex items-center gap-2 mt-4'>
                        <Badge className='text-blue-700 font-bold px-2 py-1 bg-blue-100 rounded-md' variant="ghost">
                            {singleJob?.position} Positions
                        </Badge>
                        <Badge className='text-[#F83002] font-bold px-2 py-1 bg-red-100 rounded-md' variant="ghost">
                            {singleJob?.jobType}
                        </Badge>
                        <Badge className='text-[#7209b7] font-bold px-2 py-1 bg-purple-100 rounded-md' variant="ghost">
                            {singleJob?.salary} Euro
                        </Badge>
                    </div>
                </div>
                <Button
                    onClick={isApplied ? null : applyJobHandler}
                    disabled={isApplied}
                    className={`rounded-lg px-4 py-2 ${isApplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#7209b7] hover:bg-[#5f32ad] transition duration-300'}`}>
                    {isApplied ? 'Already Applied' : 'Apply Now'}
                </Button>
            </div>
            <h1 className='border-b-2 border-gray-300 font-medium py-4 text-lg text-gray-700'>Job Description</h1>
            <div className='my-4'>
                <h1 className='font-bold my-1'>Role: <span className='pl-4 font-normal text-gray-800'>{singleJob?.title}</span></h1>
                <h1 className='font-bold my-1'>Location: <span className='pl-4 font-normal text-gray-800'>{singleJob?.location}</span></h1>
                <h1 className='font-bold my-1'>Description: <span className='pl-4 font-normal text-gray-800'>{singleJob?.description}</span></h1>
                <h1 className='font-bold my-1'>Experience: <span className='pl-4 font-normal text-gray-800'>{singleJob?.experience} Years</span></h1>
                <h1 className='font-bold my-1'>Salary: <span className='pl-4 font-normal text-gray-800'>{singleJob?.salary} Euro</span></h1>
                <h1 className='font-bold my-1'>Total Applicants: <span className='pl-4 font-normal text-gray-800'>{singleJob?.applications?.length}</span></h1>
                <h1 className='font-bold my-1'>Posted Date: <span className='pl-4 font-normal text-gray-800'>{singleJob?.createdAt?.split("T")[0]}</span></h1>
            </div>
        </div>
    );
};

export default JobDescription;
