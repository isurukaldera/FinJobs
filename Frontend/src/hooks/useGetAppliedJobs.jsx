import { setAllAppliedJobs } from "../redux/jobSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux"
import { APPLICATION_API_END_POINT } from "../utils/constant";

const useGetAppliedJobs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get(`${APPLICATION_API_END_POINT}/get`, {
          headers: {
            Authorization: `Bearer ${token}`, // Send token in Authorization header
          },
          withCredentials: true, // If you're using cookies, keep this, otherwise remove it
        });
        console.log(res.data); // Check this log to see the structure of the response
        if (res.data.success) {
          dispatch(setAllAppliedJobs(res.data.application));
        } else {
          console.log('No applied jobs found or unsuccessful response');
        }
      } catch (error) {
        console.log('Error fetching applied jobs:', error);
      }
    };
    fetchAppliedJobs();
  }, [dispatch]); // Add dispatch as a dependency
};

export default useGetAppliedJobs;