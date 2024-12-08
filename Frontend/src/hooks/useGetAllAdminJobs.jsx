// useGetAllAdminJobs.js
import { setAllAdminJobs } from "../redux/jobSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { JOB_API_END_POINT } from "../utils/constant";

const useGetAllAdminJobs = () => {
  const dispatch = useDispatch();
  useEffect(()=>{
      const fetchAllAdminJobs = async () => {
          try {
              const res = await axios.get(`${JOB_API_END_POINT}/getadminjobs`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                withCredentials: true,
            });
              if(res.data.success){
                  dispatch(setAllAdminJobs(res.data.jobs));
              }
          } catch (error) {
              console.log(error);
          }
      }
      fetchAllAdminJobs();
  },[])
}

export default useGetAllAdminJobs;
