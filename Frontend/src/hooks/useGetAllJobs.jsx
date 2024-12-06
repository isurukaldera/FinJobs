import axios from 'axios'
import { useEffect } from 'react'
import { JOB_API_END_POINT } from '../utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { setAllJobs } from '../redux/jobSlice'

const useGetAllJobs = () => {
    const dispatch = useDispatch();
    const { searchedQuery } = useSelector((store) => store.job); // Get the search query from Redux

    useEffect(() => {
        const fetchAllJobs = async () => {
            try {
                const token = localStorage.getItem('token'); // Retrieve token from localStorage
                console.log('Token:', token); // Log the token to debug
        
                if (!token) {
                    console.error('No token found. User might not be logged in.');
                    return;
                }
        
                // Make the API call
                const res = await axios.get(`${JOB_API_END_POINT}/get?keyword=${searchedQuery}`, {
                    headers: {
                        Authorization: `Bearer ${token}`, // Include token in the request
                    },
                    withCredentials: true, // Optional if using cookies
                });
        
                console.log('API Response:', res.data);
        
                if (res.data.success) {
                    dispatch(setAllJobs(res.data.jobs)); // Update Redux state
                    console.log('Jobs set in Redux:', res.data.jobs);
                } else {
                    console.error('API responded without success:', res.data.message);
                }
            } catch (error) {
                console.error('Error fetching jobs:', error.response?.data || error.message);
            }
        };

        fetchAllJobs();
    }, [dispatch, searchedQuery]); // Dependencies: re-run when `dispatch` or `searchedQuery` changes
};

export default useGetAllJobs    