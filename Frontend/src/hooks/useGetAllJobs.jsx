import axios from 'axios';
import { useEffect } from 'react';
import { JOB_API_END_POINT } from '../utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { setAllJobs } from '../redux/jobSlice';

const useGetAllJobs = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchAllJobs = async () => {
            try {
                const token = localStorage.getItem("token"); // Retrieve the token from localStorage
                if (!token) {
                    console.error("No token found. User might not be authenticated.");
                    return; // Exit if there's no token
                }

                // Make the API request with the token in the header
                const response = await axios.get(
                    "https://finjobs-1-backend.onrender.com/api/v1/job/get", 
                    {
                        headers: {
                            Authorization: `Bearer ${token}`, // Include token for authentication
                        },
                    }
                );

                console.log("Fetched Jobs:", response.data.jobs);  // Log the response to check if jobs are returned

                // Dispatch action to store jobs in Redux state
                if (response.data.success) {
                    dispatch(setAllJobs(response.data.jobs)); // Assuming response.data.jobs contains job data
                } else {
                    console.error("Failed to fetch jobs:", response.data.message);
                }

            } catch (err) {
                console.error("Error fetching jobs:", err);
            }
        };

        fetchAllJobs(); // Call the function to fetch jobs when the component mounts

    }, [dispatch]); // Make sure to only re-run the effect when necessary

};

export default useGetAllJobs;
