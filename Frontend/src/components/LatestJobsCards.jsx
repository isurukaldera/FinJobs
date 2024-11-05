import React from 'react';
import { Badge } from '../../@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

const LatestJobsCards = ({ job }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/description/${job._id}`)}
      className='p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer ml-20 transform transition duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-blue-500 hover:bg-blue-50'
    >
      <div className='transition duration-300 hover:text-blue-700'>
        <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
        <p className='text-sm text-gray-500'>Lahti</p>
      </div>
      <div className='transition duration-300 hover:text-blue-700'>
        <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
        <p className='text-sm text-gray-600'>{job?.description}</p>
      </div>
      <div className='flex items-center gap-2 mt-4'>
        <Badge className='text-blue-700 font-bold px-1.5 transition duration-300 hover:bg-blue-100' variant='ghost'>
          {job?.position} Positions
        </Badge>
        <Badge className='text-[#F83002] font-bold px-1.5 transition duration-300 hover:bg-red-100' variant='ghost'>
          {job?.jobType}
        </Badge>
        <Badge className='text-[#7209b7] font-bold px-1.5 transition duration-300 hover:bg-purple-100' variant='ghost'>
          {job?.salary} Euro
        </Badge>
      </div>
    </div>
  );
};

export default LatestJobsCards;
