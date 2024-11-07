import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../@/components/ui/table';
import { Popover } from '@radix-ui/react-popover';
import { Edit2, MoreHorizontal, Eye } from 'lucide-react';
import { PopoverContent, PopoverTrigger } from '../@/components/ui/popover';
import { useNavigate } from 'react-router-dom';

const AdminJobsTable = () => {
    const { allAdminJobs, searchJobByText } = useSelector((store) => store.job);
    const [filterJobs, setFilterJobs] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (!allAdminJobs || allAdminJobs.length === 0) return;

        const filteredJobs = allAdminJobs.filter((job) => {
            if (!searchJobByText) return true;
            return (
                job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
                job?.company?.name?.toLowerCase().includes(searchJobByText.toLowerCase())
            );
        });

        setFilterJobs(filteredJobs);
    }, [allAdminJobs, searchJobByText]);

    return (
        <div className="overflow-x-auto">
            <Table className="min-w-full divide-y divide-gray-200">
                <TableCaption className="text-left text-lg font-semibold">A list of your recent posted jobs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="px-6 py-3 text-left text-xs font-medium text-blue-500 uppercase tracking-wider font-bold">Company Name</TableHead>
                        <TableHead className="px-6 py-3 text-left text-xs font-medium text-blue-500 uppercase tracking-wider font-bold">Role</TableHead>
                        <TableHead className="px-6 py-3 text-center text-xs font-medium text-blue-500 uppercase tracking-wider font-bold">Date</TableHead>
                        <TableHead className="px-6 py-3 text-right text-xs font-medium text-blue-500 uppercase tracking-wider font-bold">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className="bg-white divide-y divide-gray-200">
                    {filterJobs?.map((job) => (
                        <TableRow key={job._id} className="hover:bg-gray-100">
                            <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{job?.company?.name}</TableCell>
                            <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{job?.title}</TableCell>
                            <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">{job?.createdAt?.split("T")[0]}</TableCell>
                            <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right cursor-pointer">
                                <Popover>
                                    <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                                    <PopoverContent className="w-32 bg-white shadow-lg rounded-md p-2">
                                        <div onClick={() => navigate(`/admin/companies/${job._id}`)} className='flex items-center gap-2 w-fit cursor-pointer hover:bg-gray-200 p-2 rounded-md'>
                                            <Edit2 className='w-4' />
                                            <span>Edit</span>
                                        </div>
                                        <div onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)} className='flex items-center w-fit gap-2 cursor-pointer mt-2 hover:bg-gray-200 p-2 rounded-md'>
                                            <Eye className='w-4'/>
                                            <span>Applicants</span>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default AdminJobsTable;
