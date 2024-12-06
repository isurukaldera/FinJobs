import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Navbar from '../components/ui/Nav/Navbar';
import axios from 'axios';
import { APPLICATION_API_END_POINT } from '../utils/constant';
import { setAllApplicants } from '../redux/applicationSlice';
import ApplicantsTable from './ApplicantsTable';

const Applicants = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  
  const { applicants } = useSelector((store) => store.application) || { applicants: [] };

  useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
        const res = await axios.get(`https://finjobs-1.onrender.com/api/v1/application/${id}/applicants`, { withCredentials: true });
        console.log('API Response:', res.data);
        if (res.data.job) {
          dispatch(setAllApplicants(res.data.job));  
          console.log('Applicants set:', res.data.job); 
        } else {
          console.error('No job data found in response');
        }
      } catch (error) {
        console.error("Error fetching applicants:", error);
      }
    };
    fetchAllApplicants();
  }, [id, dispatch]);

  return (
    <div>
        <Navbar />
        <div className='max-w-7xl mx-auto'>
            <h1 className='font-bold text-xl my-5'>Applicants {applicants?.applications?.length}</h1>
            <ApplicantsTable />
        </div>
    </div>
)
}

export default Applicants