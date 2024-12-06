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
            const token = localStorage.getItem("authToken");
            if (!token) {
              console.error("No token found. User might not be authenticated.");
              return;
            }
            try {
              const response = await axios.get("https://finjobs-1-backend.onrender.com/api/v1/job/get", {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
              return response.data;
            } catch (error) {
              console.error("Error fetching jobs:", error.response?.data || error.message);
            }
          };
          
        
        fetchAllJobs();
    },[])
}

export default useGetAllJobs    