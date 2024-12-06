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
                console.log('Making API call to:', `${JOB_API_END_POINT}/get?keyword=${searchedQuery}`); // Log the URL
                const res = await axios.get(`${JOB_API_END_POINT}/get?keyword=${searchedQuery}`, {
                    withCredentials: true, // Include cookies
                });

                console.log('API Response:', res.data); // Log the API response

                if (res.data.success) {
                    dispatch(setAllJobs(res.data.jobs)); // Dispatch the jobs to Redux
                    console.log('Jobs set in Redux:', res.data.jobs); // Log jobs
                } else {
                    console.error('API responded without success:', res.data.message); // Log failure message
                }
            } catch (error) {
                console.error('Error fetching jobs:', error.response?.data || error.message); // Log error details
            }
        };

        fetchAllJobs();
    }, [dispatch, searchedQuery]); // Dependencies: re-run when `dispatch` or `searchedQuery` changes
};

export default useGetAllJobs    