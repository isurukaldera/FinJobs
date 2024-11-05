import React from 'react';
import { TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../../@/components/ui/table';
import { Badge } from '../../@/components/ui/badge';

const AppliedJobTable = () => {
  return (
    <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">
        <TableCaption className="text-lg font-semibold text-gray-700">A list of your applied jobs</TableCaption>
        <TableHeader className="bg-gray-100">
          <TableRow>
            <TableHead className="w-[100px] text-center py-3">Date</TableHead>
            <TableHead className="w-1/4 text-center py-3">Job Role</TableHead>
            <TableHead className="w-[150px] text-center py-3">Company</TableHead>
            <TableHead className="w-[200px] text-right py-3">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="bg-white divide-y divide-gray-200">
          {[1, 2, 3, 4].map((item, index) => (
            <TableRow key={index} className="hover:bg-gray-50">
              <TableCell className="w-[100px] text-center py-4">06-10-2024</TableCell>
              <TableCell className="w-1/4 text-center py-4">Frontend Developer</TableCell>
              <TableCell className="w-[150px] text-center py-4">LUT University</TableCell>
              <TableCell className="w-[200px] text-right py-4">
                <Badge className="bg-green-100 text-green-800">Applied</Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </table>
    </div>
  );
};

export default AppliedJobTable;
