import axios from 'axios'
import { useEffect } from 'react'
import { JOB_API_END_POINT } from '../utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { setAllJobs } from '../redux/jobSlice'

const useGetAllJobs = () => {
    const dispatch = useDispatch();
    const {searchedQuery} = useSelector(store=>store.job);
    useEffect(()=>{
        const fetchAllJobs = async () => {
            try {
                const token = localStorage.getItem('token'); // Get the token from localStorage
                const response = await axios.get(`${JOB_API_END_POINT}/get`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                console.log(response.data);
            } catch (error) {
                console.error("Error fetching jobs:", error);
            }
        
        }
        fetchAllJobs();
    },[])
}

export default useGetAllJobs    