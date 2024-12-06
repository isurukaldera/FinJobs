import axios from "axios";
import { useEffect } from "react";
import { JOB_API_END_POINT } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setAllJobs } from "../redux/jobSlice";

const useGetAllJobs = () => {
  const dispatch = useDispatch();
  const { searchedQuery } = useSelector((store) => store.job);

  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        // Retrieve token from localStorage
        const token = localStorage.getItem("token");

        if (!token) {
          console.error("No token found. User might not be authenticated.");
          return; // Prevent the request if no token exists
        }

        const response = await axios.get(
          "https://finjobs-1-backend.onrender.com/api/v1/job/get", 
          {
            headers: { Authorization: `Bearer ${token}` }, // Include token in headers
            withCredentials: true, // Ensure cookies are sent with the request
          }
        );

        console.log("Jobs data:", response.data);
        dispatch(setAllJobs(response.data.jobs));
      } catch (err) {
        console.error("Error fetching jobs:", err);
      }
    };

    fetchAllJobs();
  }, [dispatch, searchedQuery]);
};

export default useGetAllJobs;
