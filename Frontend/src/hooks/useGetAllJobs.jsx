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
                const token = localStorage.getItem('token'); // Retrieve token from localStorage

                if (token) {
                    const response = await axios.get(`${JOB_API_END_POINT}/get`, {
                        headers: {
                            'Authorization': `Bearer ${token}`, // Include token in Authorization header
                        },
                        // 'withCredentials': true,  // Uncomment if you need cookies
                    });

                    console.log(response.data); // Debug: Log response

                    if (response.data.success) {
                        dispatch(setAllJobs(response.data.jobs)); // Assuming 'jobs' field contains job list
                    } else {
                        console.error("Failed to fetch jobs:", response.data.message);
                    }
                } else {
                    console.log("No token found, cannot fetch jobs.");
                }
            } catch (error) {
                console.error("Error fetching jobs:", error); // Log full error object for better debugging
            }
        };

        fetchAllJobs();
    }, [dispatch, searchedQuery]); // Rerun fetch when 'searchedQuery' changes

};

export default useGetAllJobs    