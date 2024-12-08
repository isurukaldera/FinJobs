import axios from 'axios';
import { useEffect, useState } from 'react';
import { JOB_API_END_POINT } from '../utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { setAllJobs } from '../redux/jobSlice';
import { toast } from 'sonner';


const useGetAllJobs = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchJobs = async () => {
            setLoading(true);
            const token = localStorage.getItem('token'); // Retrieve token from localStorage

            if (!token) {
                setError('No token found');
                toast.error('Authentication token not found');
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get(`${JOB_API_END_POINT}/get`, {
                    headers: {
                        Authorization: `Bearer ${token}`, // Add token to Authorization header
                    },
                    withCredentials: true,
                });
                setJobs(response.data); // Set the fetched jobs data
            } catch (error) {
                console.error('Error fetching jobs:', error);
                setError(error.message || 'Failed to fetch jobs');
                toast.error('Failed to fetch jobs');
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, []); // Empty dependency array ensures the effect runs only once when the component mounts

    return { jobs, loading, error };
};


export default useGetAllJobs
