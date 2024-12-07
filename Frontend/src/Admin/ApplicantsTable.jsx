import React from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../../@/components/ui/table'; 
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'; 
import { MoreHorizontal } from 'lucide-react'; 
import { useSelector } from 'react-redux'; 
import { toast } from 'sonner'; 
import axios from 'axios'; 
import { APPLICATION_API_END_POINT } from '../utils/constant';

const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
  const { applicants } = useSelector(store => store.application);

  const statusHandler = async (status, id) => {
      console.log('called');
      try {
          axios.defaults.withCredentials = true;
          const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`, { status });
          console.log(res);
          if (res.data.success) {
              toast.success(res.data.message);
          }
      } catch (error) {
          toast.error(error.response.data.message);
      }
  }
    return (
        <div className="overflow-x-auto">
          <Table className="min-w-full table-auto bg-white shadow-md rounded-lg">
            <TableCaption className="text-lg font-semibold text-gray-700 pb-4">
              A list of your recent applied users
            </TableCaption>
            <TableHeader>
              <TableRow className="border-b border-gray-200">
                <TableHead className="px-4 py-3 text-left text-sm font-medium text-blue-600">Full Name</TableHead>
                <TableHead className="px-4 py-3 text-left text-sm font-medium text-blue-600">Email</TableHead>
                <TableHead className="px-4 py-3 text-left text-sm font-medium text-blue-600">Contact</TableHead>
                <TableHead className="px-4 py-3 text-left text-sm font-medium text-blue-600">Resume</TableHead>
                <TableHead className="px-4 py-3 text-left text-sm font-medium text-blue-600">Date</TableHead>
                <TableHead className="px-4 py-3 text-right text-sm font-medium text-blue-600">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {applicants && applicants?.applications?.length > 0 ? (
                applicants?.applications.map((item) => (
                  <TableRow key={item._id} className="border-b border-gray-100">
                    <TableCell className="px-2 py-3 text-sm text-gray-700 ">{item?.applicant?.fullname || 'N/A'}</TableCell>
                    <TableCell className="px-4 py-3 text-sm text-gray-700">{item?.applicant?.email || 'N/A'}</TableCell>
                    <TableCell className="px-4 py-3 text-sm text-gray-700">{item?.applicant?.phoneNumber || 'N/A'}</TableCell>
                    <TableCell className="px-4 py-3 text-sm text-gray-700">
                      {item?.applicant?.profile?.resume ? (
                        <a
                          className="text-blue-600 hover:text-blue-800 font-medium"
                          href={item?.applicant?.profile?.resume}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {item?.applicant?.profile?.resumeOriginalName}
                        </a>
                      ) : (
                        <span className="text-gray-500">NA</span>
                      )}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-sm text-gray-700">
                      {item?.applicant?.createdAt ? item?.applicant?.createdAt.split("T")[0] : 'N/A'}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-right text-sm text-gray-700">
                      <Popover>
                        <PopoverTrigger className="text-gray-600 hover:text-gray-800 cursor-pointer">
                          <MoreHorizontal />    
                        </PopoverTrigger>
                        <PopoverContent className="w-32 bg-white shadow-lg rounded-md p-2">
                          {shortlistingStatus.map((status, index) => (
                            <div
                              key={index}
                              onClick={() => statusHandler(status, item?._id)}
                              className="flex w-full items-center py-1 px-2 text-sm text-gray-600 hover:bg-gray-100 rounded cursor-pointer"
                            >
                              <span>{status}</span>
                            </div>
                          ))}
                        </PopoverContent>
                      </Popover>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="px-4 py-3 text-center text-sm text-gray-500">No applicants found</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      );
    };
    
    export default ApplicantsTable;