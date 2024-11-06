import React, { useEffect, useState } from 'react';
import Navbar from '../src/components/ui/Nav/Navbar';
import { Input } from '../@/components/ui/input';
import { Button } from '../@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AdminJobsTable from './AdminJobsTable';
import useGetAllAdminJobs from '../src/hooks/useGetAllAdminJobs';
import { setSearchJobByText } from '../src/redux/jobSlice';

const AdminJobs = () => {
    useGetAllAdminJobs();
    const [input, setInput] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { allAdminJobs } = useSelector((state) => state.job);

    useEffect(() => {
        console.log('Search Input:', input);
        dispatch(setSearchJobByText(input)); 
    }, [input, dispatch]);

    return (
        <div>
            <Navbar />
            <div className='max-w-6xl mx-auto my-10'>
                <div className='flex items-center justify-between my-5'>
                    <Input
                        className="w-fit ml-4"
                        placeholder="Filter by name or Role"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <Button onClick={() => navigate("/admin/jobs/create")}>New Jobs</Button>
                </div>
                {allAdminJobs && allAdminJobs.length > 0 ? (
                    <AdminJobsTable />
                ) : (
                    <p>No jobs found. Please try again later.</p> 
                )}
            </div>
        </div>
    );
}

export default AdminJobs;
