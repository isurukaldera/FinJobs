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
            try {
                // Get the token from localStorage
                const token = localStorage.getItem("token");

                if (!token) {
                    console.log("No token found. User might not be authenticated.");
                    return; // No token, exit early.
                }

                // Call the API with the token in the headers
                const response = await axios.get(`${JOB_API_END_POINT}/get`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                console.log("Jobs Data:", response.data);
                // Dispatch your action to save jobs data
                dispatch(setAllJobs(response.data));

            } catch (err) {
                console.error("Error fetching jobs:", err);
            }
        };

        fetchAllJobs();
    }, [dispatch, searchedQuery]); // Re-fetch jobs when searchedQuery changes
};

export default useGetAllJobs;
