import axios from 'axios';
import { useEffect } from 'react';
import { JOB_API_END_POINT } from '../utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { setAllJobs } from '../redux/jobSlice';

const useGetAllJobs = () => {
    const dispatch = useDispatch();
    const { searchedQuery } = useSelector(store => store.job);

    useEffect(() => {
        const fetchAllJobs = async () => {
            const token = localStorage.getItem("token"); // Retrieve token
            if (!token) {
                console.error("No token found. Please log in.");
                return;
            }
            // Get token from localStorage

            if (!token) {
                console.log("No token found. User might not be authenticated.");
                return;
            }

            try {
                console.log("Token:", token);
                const res = await axios.get(`${JOB_API_END_POINT}/get?keyword=${searchedQuery}`, {
                    headers: {
                        Authorization: `Bearer ${token}`, // Send the token in the Authorization header
                    },
                    withCredentials: true, // Ensure this is there if you're using cookies for other purposes
                });

                if (res.data.success) {
                    dispatch(setAllJobs(res.data.jobs)); // Dispatch the jobs to your Redux store
                } else {
                    console.log("Failed to fetch jobs:", res.data.message);
                }
            } catch (error) {
                console.log("Error fetching jobs:", error);
            }
        };

        fetchAllJobs();
    }, [searchedQuery, dispatch]);  // Re-run the fetch when the searchedQuery changes
};


export default useGetAllJobs;
