import { Table } from 'lucide-react';
import React from 'react';
import { TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../../@/components/ui/table';
import { Badge } from '../../@/components/ui/badge';

const AppliedJobTable = () => {
  return (
    <div>
      <Table className="table-fixed w-full"> {/* Apply table-fixed and w-full */}
        <TableCaption>A list of your applied jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px] text-center">Date</TableHead>
            <TableHead className="w-1/4 text-center">Job Role</TableHead>
            <TableHead className="w-[150px] text-center">Company</TableHead>
            <TableHead className="w-[200px] text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[1, 2, 3, 4].map((item, index) => (
            <TableRow key={index}>
              <TableCell className="w-[100px] text-center">06-10-2024</TableCell>
              <TableCell className="w-1/4 text-center">Frontend</TableCell>
              <TableCell className="w-[350px] text-center">LUT University</TableCell>
              <TableCell className="rounded text-right">
                <Badge>Status</Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedJobTable;
