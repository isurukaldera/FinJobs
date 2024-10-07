import React from 'react'
import { Button } from '../../@/components/ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from '../../@/components/ui/avatar'
import { Badge } from '../../@/components/ui/badge'
import { useNavigate } from 'react-router-dom'

const Job = () => {
    const navigate = useNavigate();
    const jobId =  "asdassadwdasd";
    return (
        <div className='p-6 rounded-lg shadow-lg bg-white border border-gray-100'>
    {/* Top Section: Bookmark and Date */}
    <div className='flex items-center justify-between mb-4'>
        <Button variant="outline" className="rounded-full" size="icon">
            <Bookmark />
        </Button>
        <p className='text-sm text-gray-400'>1 week ago</p>
    </div>
    


    <div className='flex items-center gap-2 my-2'>
                <Button className="p-6" variant="outline" size="icon">
                    <Avatar>
                        <AvatarImage src=""/>
                    </Avatar>
                </Button>
        <div>
            <h1 className='text-xl font-semibold'>Frontend Developer</h1>
            <p className='text-sm text-gray-600'>Company Name | Lahti</p>
        </div>
    </div>


    <p className='text-sm text-gray-600 mb-4'>
        Join our dynamic team as a Frontend Developer, where you'll design and implement user-friendly web interfaces, ensuring seamless user experiences across all platforms.
    </p>


    <div className='flex gap-2 mb-4 '>
        <Badge className='text-blue-600 font-bold text-xs px-1.5' variant="ghost">Full-Time</Badge>
        <Badge className='text-green-600 font-bold px-1.5' variant="ghost">Remote</Badge>
        <Badge className='text-red-600 font-bold px-1.5' variant="ghost">Frontend</Badge>
    </div>

    <div className='flex justify-end gap-3'>
        <Button onClick={()=> navigate(`/description/${jobId}`) } variant="outline" className="px-4">Details</Button>
        <Button className="px-4">Apply Now</Button>
    </div>
</div>
    )
}

export default Job