import React from 'react'
import { Button } from '../../@/components/ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from '../../@/components/ui/avatar'
import { Badge } from '../../@/components/ui/badge'
import { useNavigate } from 'react-router-dom'

const Job = ({job}) => {
    const navigate = useNavigate();
    const jobId =  "asdassadwdasd";

    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference/(1000*24*60*60));
    }
    return (
        <div className='p-6 rounded-lg shadow-lg bg-white border border-gray-100'>
    {/* Top Section: Bookmark and Date */}
    <div className='flex items-center justify-between mb-4'>
        <Button variant="outline" className="rounded-full" size="icon">
            <Bookmark />
        </Button>
        <p className='text-sm text-gray-400'>{daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}</p>
    </div>
    


    <div className='flex items-center gap-2 my-2'>
                <Button className="p-6" variant="outline" size="icon">
                    <Avatar>
                        <AvatarImage src="https://www.shutterstock.com/image-photo/autodromo-di-monza-italy-30august-charles-2509892753"/>
                    </Avatar>
                </Button>
        <div>
            <h1 className='text-xl font-semibold'>{job?.title}</h1>
            <p className='text-sm text-gray-600'>{job?.company?.name}</p>
        </div>
    </div>


    <p className='text-sm text-gray-600 mb-4'>{job?.description}</p>


    <div className='flex gap-2 mb-4 '>
        <Badge className='text-blue-600 font-bold text-xs px-1.5' variant="ghost">{job?.position} Positions</Badge>
        <Badge className='text-green-600 font-bold px-1.5' variant="ghost">{job?.jobType}</Badge>
        <Badge className='text-red-600 font-bold px-1.5' variant="ghost">{job?.salary} Euro</Badge>
    </div>

    <div className='flex justify-end gap-3'>
    <Button onClick={()=> navigate(`/description/${job?._id}`)} variant="outline">Details</Button>
        <Button className="px-4">Apply Now</Button>
    </div>
</div>
    )
}

export default Job