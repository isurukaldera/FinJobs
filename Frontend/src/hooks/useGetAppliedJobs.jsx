import { setAllAppliedJobs } from "../redux/jobSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux"
import { APPLICATION_API_END_POINT } from "../utils/constant";

const useGetAppliedJobs = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAppliedJobs = async () => {
            setLoading(true);
            const token = localStorage.getItem('token'); // Retrieve token from localStorage

            if (!token) {
                setError('No token found');
                toast.error('Authentication token not found');
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get(`${APPLICATION_API_END_POINT}/get`, {
                    headers: {
                        Authorization: `Bearer ${token}`, // Add token to Authorization header
                    },
                    withCredentials: true,
                });
                setApplications(response.data); // Set the fetched applied jobs data
            } catch (error) {
                console.error('Error fetching applied jobs:', error);
                setError(error.message || 'Failed to fetch applied jobs');
                toast.error('Failed to fetch applied jobs');
            } finally {
                setLoading(false);
            }
        };

        fetchAppliedJobs();
    }, []); // Empty dependency array ensures the effect runs only once when the component mounts

    return { applications, loading, error };
};

export default useGetAppliedJobs;
