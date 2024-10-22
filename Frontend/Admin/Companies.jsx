import React from 'react'
import Navbar from '../src/components/ui/Nav/Navbar'
import { Input } from '../@/components/ui/input'
import { Button } from '../@/components/ui/button'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'

const Companies = () => {
    const navigate = useNavigate();
    return (
        <div>
            <Navbar />
            <div className='max-w-6xl mx-auto my-10'>
                <div className='flex items-center justify-between my-5 mx-10'> {/* Adjusted margin */}
                    <Input
                        className="w-fit ml-4"
                        placeholder="Filter by name"
                    />
                    <Button onClick={() => navigate("/admin/companies/create")} className='mr-2' >New Company</Button>
                </div>
                <CompaniesTable />
            </div>
        </div>
    )
}

export default Companies
