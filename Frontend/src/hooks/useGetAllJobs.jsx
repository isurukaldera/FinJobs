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
                const token = localStorage.getItem("token"); // or however you store the token
                const response = await axios.get("https://finjobs-1-backend.onrender.com/api/v1/job/get", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                console.log(response.data);
            } catch (err) {
                console.error(err);
            }
        };
        
        fetchAllJobs();
    },[])
}

export default useGetAllJobs    