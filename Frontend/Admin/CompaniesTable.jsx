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
import { useSelector } from 'react-redux';

const CompaniesTable = () => {
  const { companies } = useSelector((store) => store.company);


  return (
    <div className="max-w-6xl mx-auto my-10">
      <Table className="table-fixed w-full">
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
          {companies.map((company) => (
            <tr>
              <TableRow key={company.id}>
                <TableCell className="w-[100px] text-center">
                  <Avatar>
                    <AvatarImage src={company.logo} />
                  </Avatar>
                </TableCell>
                <TableCell className="w-1/4 text-center">{company.name}</TableCell>
                <TableCell className="w-[350px] text-center">{company.createdAt.split("T")[0]}</TableCell>
                <TableCell className="w-[200px] text-right">
                  <Popover>
                    <PopoverTrigger className='mr-2'>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                      <div className="flex justify-end items-center gap-2">
                        <Edit2 className="w-4" />
                        <span>Edit</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            </tr>
            ))}
              
        </TableBody>
      </Table>
    </div>
  );
}

export default CompaniesTable;
