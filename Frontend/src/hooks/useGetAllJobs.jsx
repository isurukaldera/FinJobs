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
            try {
                const res = await axios.get(
                    `${JOB_API_END_POINT}/get?keyword=${searchedQuery}`, 
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,  // Attach the token in the Authorization header
                        },
                        withCredentials: true,  // Ensure credentials (cookies) are sent if needed
                    }
                );
                if (res.data.success) {
                    dispatch(setAllJobs(res.data.jobs));
                }
            } catch (error) {
                console.log("Error fetching jobs:", error);
                // Handle other error states (e.g., 401 Unauthorized)
                if (error.response && error.response.status === 401) {
                    console.log("Unauthorized: Please log in again.");
                    // Optionally, handle redirection to login page
                }
            }
        };

        if (searchedQuery && token) {
            fetchAllJobs();
        }
    }, [searchedQuery, token, dispatch]);  // Add token to dependencies to re-run when it changes
};

export default useGetAllJobs;

