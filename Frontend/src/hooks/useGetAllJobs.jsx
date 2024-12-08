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
            const token = localStorage.getItem('token'); // Get token from localStorage
        
            if (!token) {
                console.log('No token found');
                return;
            }
        
            try {
                const response = await axios.get('https://finjobs-1-backend.onrender.com/api/v1/job/get', {
                    headers: {
                        Authorization: `Bearer ${token}`, // Add token to Authorization header
                    },
                    withCredentials: true, // Include credentials if required
                });
        
                console.log('Fetched jobs:', response.data);
            } catch (error) {
                console.error('Error fetching jobs:', error);
                // Show specific error details
                if (error.response) {
                    console.error('Error Response:', error.response.data);
                    console.error('Error Status:', error.response.status);
                }
            }
        };

        fetchJobs();
    }, []); // Empty dependency array ensures the effect runs only once when the component mounts

    return { jobs, loading, error };
};


export default useGetAllJobs
