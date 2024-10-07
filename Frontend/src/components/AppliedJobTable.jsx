import { Table } from 'lucide-react'
import React from 'react'
import { TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../../@/components/ui/table'
import { Badge } from '../../@/components/ui/badge'


const AppliedJobTable = () => {
  return (
    <div>
            <Table>
                <TableCaption>A list of your applied jobs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Job Role</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead className="text-right">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        [1,2,3,4].map((item, index) => (
                            <TableRow>
                                <TableCell>06-10-2024</TableCell>
                                <TableCell>Frontend</TableCell>
                                <TableCell>Lut University</TableCell>
                                <TableCell className="text-right"><Badge>Status</Badge></TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
  )
}

export default AppliedJobTable