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
                const token = localStorage.getItem("token");
                console.log("Stored token: ", token); // Log the token to verify its value

                if (!token) {
                    console.error("No token found. Please log in.");
                    return;
                }

                const res = await axios.get(`${JOB_API_END_POINT}/get?keyword=${searchedQuery}`, {
                    headers: {
                        Authorization: `Bearer ${token}`, // Ensure proper format
                    },
                    withCredentials: true,
                });

                if (res.data.success) {
                    dispatch(setAllJobs(res.data.jobs));
                } else {
                    console.log("Failed to fetch jobs:", res.data.message);
                }
            } catch (error) {
                console.error("Error fetching jobs:", error);
            }
        };

        fetchAllJobs();
    }, []);
}

export default useGetAllJobs;
