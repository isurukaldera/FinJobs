import axios from 'axios'
import { useEffect } from 'react'
import { JOB_API_END_POINT } from '../utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { setAllJobs } from '../redux/jobSlice'

const useGetAllJobs = () => {
    const dispatch = useDispatch();
    const { searchedQuery } = useSelector(store => store.job);

    useEffect(() => {
        const fetchAllJobs = async () => {
            try {
                const token = localStorage.getItem('token'); // Get the token from localStorage
                if (token) {
                    const response = await axios.get(`${JOB_API_END_POINT}/get`, {
                        headers: {
                            'Authorization': `Bearer ${token}`, // Add token to the header
                        },
                        withCredentials: true, // If needed for cookies
                    });
                    console.log(response.data); // Check this log to see the response
                    if (response.data.success) {
                        dispatch(setAllJobs(response.data.jobs)); // Assuming the jobs are in the 'jobs' field
                    }
                } else {
                    console.log("No token found, cannot fetch jobs.");
                }
            } catch (error) {
                console.error("Error fetching jobs:", error);
            }
        };

        fetchAllJobs();
    }, [dispatch, searchedQuery]); // Add searchedQuery as a dependency if needed
};

export default useGetAllJobs    