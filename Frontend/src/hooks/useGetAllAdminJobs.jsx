// useGetAllAdminJobs.js
import { setAllAdminJobs } from "../redux/jobSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { JOB_API_END_POINT } from "../utils/constant";

const useGetAllAdminJobs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllAdminJobs = async () => {
      
      try {
        console.log("Fetching admin jobs...");
        const res = await axios.get(`${JOB_API_END_POINT}/getadminjobs`,);

        console.log('Fetched Jobs:', res.data);

        if (res.data.success) {
          dispatch(setAllAdminJobs(res.data.jobs));
        } else {
          console.error('Failed to fetch jobs:', res.data.message);
        }
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchAllAdminJobs();
  }, [dispatch]);
};

export default useGetAllAdminJobs;
