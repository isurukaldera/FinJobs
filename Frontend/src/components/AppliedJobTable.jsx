import React, { useEffect } from 'react';
import { TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../../@/components/ui/table';
import { Badge } from '../../@/components/ui/badge';
import { setAllAppliedJobs } from '../redux/applicationSlice';
import { useDispatch, useSelector } from 'react-redux';
import useGetAppliedJobs from '../hooks/useGetAppliedJobs';


const AppliedJobTable = () => {
  useGetAppliedJobs(); // Fetch applied jobs data

  const { allAppliedJobs = [] } = useSelector(store => store.job);

  return (
    <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200 text-sm">
        <TableCaption className="text-lg font-semibold text-gray-700">
          A list of your applied jobs
        </TableCaption>
        <TableHeader className="bg-gray-100">
          <TableRow>
            <TableHead className="w-[100px] text-center py-3">Date</TableHead>
            <TableHead className="w-1/4 text-center py-3">Job Role</TableHead>
            <TableHead className="w-[150px] text-center py-3">Company</TableHead>
            <TableHead className="w-[200px] text-right py-3">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="bg-white divide-y divide-gray-200">
        {
            allAppliedJobs.length <= 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-4">
                  You haven't applied to any job yet.
                </TableCell>
              </TableRow>
            ) : (
              allAppliedJobs.map((appliedJob) => (
                <TableRow key={appliedJob._id} className="hover:bg-gray-50">
                  <TableCell className="w-[100px] text-center py-4">
                    {appliedJob?.createdAt?.split("T")[0]}
                  </TableCell>
                  <TableCell className="w-1/4 text-center py-4">
                    {appliedJob.job?.title}
                  </TableCell>
                  <TableCell className="w-[150px] text-center py-4">
                    {appliedJob.job?.company?.name}
                  </TableCell>
                  <TableCell className="w-[200px] text-right py-1">
                    <span className={`px-2 py-1 rounded-full text-xs text-white transition-colors duration-200 ${appliedJob?.status === "rejected" ? 'bg-red-500 hover:bg-red-600' : appliedJob.status === 'pending' ? 'bg-gray-500 hover:bg-gray-600' : 'bg-green-500 hover:bg-green-600'}`}>
                      {appliedJob.status.toUpperCase()}
                    </span>
                  </TableCell>
                </TableRow>
              ))
            )
          }
        </TableBody>
      </table>
    </div>
  );
};

export default AppliedJobTable;