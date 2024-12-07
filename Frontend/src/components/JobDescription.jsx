import React, { useEffect, useState } from 'react';
import { Badge } from '../../@/components/ui/badge';
import { Button } from './ui/button';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '../utils/constant';
import { setSingleJob } from '../redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

const JobDescription = () => {
    const { singleJob } = useSelector((store) => store.job);
    const { user } = useSelector((store) => store.auth);
    const isInitiallyApplied = singleJob?.applications?.some(
        (application) => application.applicant === user?._id
    ) || false;
    const [isApplied, setIsApplied] = useState(isInitiallyApplied);

    const params = useParams();
    const jobId = params.id; // Extract jobId from route params
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const applyJobHandler = async () => {
        const token = localStorage.getItem('token');
        if (!jobId) {
            toast.error("Invalid Job ID. Please try again.");
            return;
        }

        try {
            const url = `${APPLICATION_API_END_POINT}/apply/${jobId}`;
            console.log('Applying to Job at URL:', url); // Debugging log

            const res = await axios.post(
                url,
                {}, // Add request body if required by backend
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Send token in Authorization header
                    },
                    withCredentials: true,
                }
            );

            if (res.data.success) {
                setIsApplied(true); // Update the local state
                const updatedSingleJob = {
                    ...singleJob,
                    applications: [...singleJob.applications, { applicant: user?._id }],
                };
                dispatch(setSingleJob(updatedSingleJob)); // Helps to update UI in real time
                toast.success(res.data.message);
            }
        } catch (error) {
            console.error('Error applying to job:', error.response || error.message);
            toast.error(error.response?.data?.message || 'Failed to apply for the job.');
        }
    };

    useEffect(() => {
        const fetchSingleJob = async () => {
            const token = localStorage.getItem('token');
            if (!jobId) {
                toast.error("Invalid Job ID. Redirecting...");
                navigate('/jobs'); // Redirect to jobs list or home page
                return;
            }

            try {
                const url = `${JOB_API_END_POINT}/get/${jobId}`;
                console.log('Fetching Job Details at URL:', url); // Debugging log

                const res = await axios.get(url, {
                    headers: {
                        Authorization: `Bearer ${token}`, // Send token in Authorization header
                    },
                    withCredentials: true,
                });

                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(
                        res.data.job.applications.some(
                            (application) => application.applicant === user?._id
                        )
                    ); // Ensure state sync with fetched data
                }
            } catch (error) {
                console.error('Error fetching job details:', error.response || error.message);
                toast.error(
                    error.response?.data?.message || 'Job not found. Redirecting to jobs list.'
                );
                navigate('/jobs'); // Redirect to jobs list if job is not found
            }
        };

        fetchSingleJob();
    }, [jobId, dispatch, navigate, user?._id]);

    return (
        <div className='max-w-7xl mx-auto my-10 p-6 bg-white rounded-lg shadow-lg'>
            <div className='flex items-center justify-between mb-6'>
                <div>
                    <h1 className='font-bold text-2xl text-gray-800'>{singleJob?.title}</h1>
                    <div className='flex items-center gap-2 mt-4'>
                        <Badge
                            className='text-blue-700 font-bold px-2 py-1 bg-blue-100 rounded-md'
                            variant='ghost'>
                            {singleJob?.position} Positions
                        </Badge>
                        <Badge
                            className='text-[#F83002] font-bold px-2 py-1 bg-red-100 rounded-md'
                            variant='ghost'>
                            {singleJob?.jobType}
                        </Badge>
                        <Badge
                            className='text-[#7209b7] font-bold px-2 py-1 bg-purple-100 rounded-md'
                            variant='ghost'>
                            {singleJob?.salary} Euro
                        </Badge>
                    </div>
                </div>
                <Button
                    onClick={isApplied ? null : applyJobHandler}
                    disabled={isApplied}
                    className={`rounded-lg px-4 py-2 ${
                        isApplied
                            ? 'bg-gray-600 cursor-not-allowed'
                            : 'bg-[#7209b7] hover:bg-[#5f32ad] transition duration-300'
                    }`}>
                    {isApplied ? 'Already Applied' : 'Apply Now'}
                </Button>
            </div>
            <h1 className='border-b-2 border-gray-300 font-medium py-4 text-lg text-gray-700'>
                Job Description
            </h1>
            <div className='my-4'>
                <h1 className='font-bold my-1'>
                    Role: <span className='pl-4 font-normal text-gray-800'>{singleJob?.title}</span>
                </h1>
                <h1 className='font-bold my-1'>
                    Location:{' '}
                    <span className='pl-4 font-normal text-gray-800'>{singleJob?.location}</span>
                </h1>
                <h1 className='font-bold my-1'>
                    Description:{' '}
                    <span className='pl-4 font-normal text-gray-800'>{singleJob?.description}</span>
                </h1>
                <h1 className='font-bold my-1'>
                    Experience:{' '}
                    <span className='pl-4 font-normal text-gray-800'>
                        {singleJob?.experience} Years
                    </span>
                </h1>
                <h1 className='font-bold my-1'>
                    Salary:{' '}
                    <span className='pl-4 font-normal text-gray-800'>{singleJob?.salary} Euro</span>
                </h1>
                <h1 className='font-bold my-1'>
                    Total Applicants:{' '}
                    <span className='pl-4 font-normal text-gray-800'>
                        {singleJob?.applications?.length}
                    </span>
                </h1>
                <h1 className='font-bold my-1'>
                    Posted Date:{' '}
                    <span className='pl-4 font-normal text-gray-800'>
                        {singleJob?.createdAt?.split('T')[0]}
                    </span>
                </h1>
            </div>
        </div>
    );
};

export default JobDescription;
