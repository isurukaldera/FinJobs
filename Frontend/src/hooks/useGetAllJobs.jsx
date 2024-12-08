import axios from 'axios';
import { useEffect } from 'react';
import { JOB_API_END_POINT } from '../utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { setAllJobs } from '../redux/jobSlice';


const useGetAllJobs = () => {
    const dispatch = useDispatch();
    const {searchedQuery} = useSelector(store=>store.job);
    useEffect(()=>{
        const fetchAllJobs = async () => {
            const token = localStorage.getItem('token'); // Retrieve token from localStorage
        
            if (!token) {
                console.log('No token found');
                return;
            }
        
            console.log('Token being sent:', token); // Log token to verify it's correct
        
            try {
                const response = await axios.get('https://finjobs-1-backend.onrender.com/api/v1/job/get', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    
                });
                
        
                console.log('Fetched jobs:', response.data);
            } catch (error) {
                console.error('Error fetching jobs:', error);
                if (error.response) {
                    console.error('Error Response:', error.response.data);
                    console.error('Error Status:', error.response.status);
                }
            }
        };
        
        fetchAllJobs(); // Test the function
    },[])
}

export default useGetAllJobs
