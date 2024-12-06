import { setAllAppliedJobs } from "../redux/jobSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux"
import { APPLICATION_API_END_POINT } from "../utils/constant";

const useGetAppliedJobs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
      const fetchAppliedJobs = async () => {
          try {
              const token = localStorage.getItem('token'); // Get the token from localStorage
              if (token) {
                  const res = await axios.get(`${APPLICATION_API_END_POINT}/get`, {
                      headers: {
                          'Authorization': `Bearer ${token}`, // Include the token here
                      },
                      withCredentials: true,  // If needed for cookies
                  });
                  console.log(res.data); // Check this log to see the structure of the response
                  if (res.data.success) {
                      dispatch(setAllAppliedJobs(res.data.application));
                  } else {
                      console.log('No applied jobs found or unsuccessful response');
                  }
              } else {
                  console.log("No token found, cannot fetch applied jobs.");
              }
          } catch (error) {
              console.log('Error fetching applied jobs:', error);
          }
      };

      fetchAppliedJobs();
  }, [dispatch]); // Add dispatch as a dependency
};
  
  export default useGetAppliedJobs;