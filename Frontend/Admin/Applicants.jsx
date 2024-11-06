import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Navbar from '../src/components/ui/Nav/Navbar';
import axios from 'axios';
import { APPLICATION_API_END_POINT } from '../src/utils/constant';
import { setAllApplicants } from '../src/redux/applicationSlice';
import ApplicantsTable from './ApplicantsTable';

const Applicants = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const { applicants } = useSelector(store => store.application);

    useEffect(() => {
        const fetchAllApplicants = async () => {
            try {
                const res = await axios.get(`${APPLICATION_API_END_POINT}/${params.id}/applicants`, { withCredentials: true });
                dispatch(setAllApplicants(res.data.job));
            } catch (error) {
                console.error("Error fetching applicants:", error);
            }
        };
        fetchAllApplicants();
    }, [params.id, dispatch]);

    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto'>
                <h1 className='font-bold text-xl my-5'>Applicants {applicants?.applications?.length || 0}</h1>
                <ApplicantsTable />
            </div>
        </div>
    );
};

export default Applicants;
