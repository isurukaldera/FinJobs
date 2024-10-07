
import React from 'react'
import { Badge } from '../../@/components/ui/badge'
import { Button } from './ui/button'

const JobDescription = () => {
    const isApplied = false;
    return (
        <div className='max-w-7xl mx-auto my-10'>
            <div className='flex items-center justify-between'>
                <div>
                    <h1 className='font-bold text-xl'>Title</h1>
                    <div className='flex items-center gap-2 mt-4'>
                        <Badge className={'text-blue-700 font-bold px-1.5'} variant="ghost">Positions</Badge>
                        <Badge className={'text-[#F83002] font-bold px-1.5'} variant="ghost">Positions</Badge>
                        <Badge className={'text-[#7209b7] font-bold px-1.5'} variant="ghost">LPA</Badge>

                    </div>

                </div>
                <Button 
                disabled = {isApplied}
                className={`rounded-lg ${isApplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#7209b7] hover:bg-[#5f32ad]'}`}>
                    {isApplied ? 'Already Applied' : 'Apply Now'}
                    </Button>

            </div>
            <h1 className='border-b-2 border-b-gray-300 font-medium py-4'>Job Description</h1>
            <div className='my-4'>
                <h1 className='font-bold my-1'>Role: <span className='pl-4 font-normal text-gray-800'>Frontend</span></h1>
                <h1 className='font-bold my-1'>Location: <span className='pl-4 font-normal text-gray-800'>Lahti</span></h1>
                <h1 className='font-bold my-1'>Description: <span className='pl-4 font-normal text-gray-800'>HI im isuru kaldra</span></h1>
                <h1 className='font-bold my-1'>Experience: <span className='pl-4 font-normal text-gray-800'>2 yrs</span></h1>
                <h1 className='font-bold my-1'>Salary: <span className='pl-4 font-normal text-gray-800'>Euro</span></h1>
                <h1 className='font-bold my-1'>Total Applicants: <span className='pl-4 font-normal text-gray-800'>25</span></h1>
                <h1 className='font-bold my-1'>Posted Date: <span className='pl-4 font-normal text-gray-800'>14/051</span></h1>
            </div>


        </div>
    )
}

export default JobDescription