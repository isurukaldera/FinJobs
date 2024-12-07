import axios from 'axios';
import { useEffect } from 'react';
import { JOB_API_END_POINT } from '../utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { setAllJobs } from '../redux/jobSlice';

const useGetAllJobs = () => {
    const dispatch = useDispatch();
    const { searchedQuery } = useSelector((store) => store.job);
    const { token } = useSelector((store) => store.auth);  // Get the token from the Redux store

    useEffect(() => {
        const fetchAllJobs = async () => {
            const token = localStorage.getItem('token');
            try {
                const res = await axios.get(
                    `${JOB_API_END_POINT}/get?keyword=${searchedQuery}`,
                    { 
                        headers: {
                            'Authorization': `Bearer ${token}` // Add token here
                        },
                        withCredentials: true // Ensure cookies are sent, if needed
                    }
                );
                
                if (res.data.success) {
                    dispatch(setAllJobs(res.data.jobs)); // Update Redux state with jobs
                }
            } catch (error) {
                console.log("Error fetching jobs:", error);
                if (error.response && error.response.status === 401) {
                    console.log("Unauthorized: Please log in again.");
                }
            }
        }
        fetchAllJobs();
    },[])
}

export default useGetAllJobs;

