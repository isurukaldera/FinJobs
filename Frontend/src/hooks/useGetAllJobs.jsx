import axios from 'axios';
import { useEffect } from 'react';
import { JOB_API_END_POINT } from '../utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { setAllJobs } from '../redux/jobSlice';


const useGetAllJobs = () => {
    const [jobs, setJobs] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchJobs = async () => {
            const token = localStorage.getItem('token'); // Or wherever you store the token
            try {
                const response = await axios.get('https://finjobs-1-backend.onrender.com/api/v1/job/get', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setJobs(response.data.jobs);
            } catch (err) {
                setError(err.response?.data || err.message);
            }
        };

        fetchJobs();
    }, []);

    return { jobs, error };
};



export default useGetAllJobs
