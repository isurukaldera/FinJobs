import React, { useEffect, useState } from 'react';
import Navbar from '../src/components/ui/Nav/Navbar';
import { Input } from '../@/components/ui/input';
import { Button } from '../@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import AdminJobsTable from './AdminJobsTable';
import useGetAllCompanies from '../src/hooks/useGetAllCompanies';
import { setSearchJobByText } from '../src/redux/jobSlice';



const AdminJobs = () => {
    useGetAllCompanies();
    const [input, setInput] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

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
                        className="w-fit"
                        placeholder="Filter by name or Role"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <Button onClick={() => navigate("/admin/jobs/create")}>New Jobs</Button>
                </div>
                <AdminJobsTable />
            </div>
        </div>
    );
}

export default AdminJobs;
