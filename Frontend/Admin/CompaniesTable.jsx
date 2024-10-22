import React from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../@/components/ui/table';
import { Avatar, AvatarImage } from '../@/components/ui/avatar';
import { Popover } from '@radix-ui/react-popover';
import { Edit2, MoreHorizontal } from 'lucide-react';
import { PopoverContent, PopoverTrigger } from '../@/components/ui/popover';

const CompaniesTable = () => {
  return (
    <div className="max-w-6xl mx-auto my-10">
      <Table className="table-fixed w-full"> {}
        <TableCaption className='font-bold text-lg my-5 content-center'>Registered companies</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Logo</TableHead>
            <TableHead className="w-1/4">Name</TableHead>
            <TableHead className="w-[150px]">Date</TableHead>
            <TableHead className="w-[200px] text-right px-8">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {/* Replace this with actual company data */}
          <TableRow>
            <TableCell className="w-[100px] text-center">
              <Avatar>
                <AvatarImage src="https://www.shutterstock.com/image-photo/3d-fire-flame-icon-isolated-on-2323084043" />
              </Avatar>
            </TableCell>
            <TableCell className="w-1/4 text-center">Company a</TableCell>
            <TableCell className="w-[350px] text-center">01/01/2024</TableCell>
            <TableCell className="w-[200px] text-right">
              <Popover>
                <PopoverTrigger className='mr-2'>
                  <MoreHorizontal />
                </PopoverTrigger>
                <PopoverContent className="w-32 ">
                  <div className="flex justify-end items-center gap-2">
                    <Edit2 className="w-4" />
                    <span>Edit</span>
                  </div>
                </PopoverContent>
              </Popover>

            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}

export default CompaniesTable;
