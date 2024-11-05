import React, { useState } from 'react';
import Navbar from './ui/Nav/Navbar';
import { Avatar, AvatarImage } from '@radix-ui/react-avatar';
import { Contact, Mail, Pen } from 'lucide-react';
import { Label } from '@radix-ui/react-label';
import { Badge } from '../../@/components/ui/badge';
import AppliedJobTable from './AppliedJobTable';
import UpdateProfileDialog from './UpdateProfileDialog';
import { Button } from './ui/button';
import { useSelector } from 'react-redux';

const Profile = () => {
  const [open, setOpen] = useState(false);
  const { user } = useSelector(store => store.auth);
  // Define isResume based on whether the user has a resume
  const isResume = user?.profile?.resume ? true : false;

  return (
    <div>
      <Navbar />
      <div className='max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8 shadow-lg'>
        <div className='flex justify-between items-center mb-6'>
          <div className='flex items-center gap-4'>
            <Avatar className="h-24 w-24 rounded-full overflow-hidden">
              <AvatarImage src={user?.profile?.profilePhoto} alt="profile" className="object-cover h-full w-full" />
            </Avatar>
            <div>
              <h1 className='font-medium text-2xl text-gray-800'>{user?.fullname}</h1>
              <p className='text-gray-600'>{user?.profile.bio}</p>
            </div>
          </div>
          <Button onClick={() => setOpen(true)} className="text-right" variant="outline">
            <Pen className="w-5 h-5" />
          </Button>
        </div>
        <div className='my-5'>
          <div className='flex items-center gap-3 my-2'>
            <Mail className="w-5 h-5 text-gray-600" />
            <span className='text-gray-700'>{user?.email}</span>
          </div>
          <div className='flex items-center gap-3 my-2'>
            <Contact className="w-5 h-5 text-gray-600" />
            <span className='text-gray-700'>{user?.phoneNumber}</span>
          </div>
        </div>
        <div className='my-5'>
          <h1 className='text-lg font-semibold text-gray-800'>Skills</h1>
          <div className='flex flex-wrap gap-2 mt-2'>
            {user?.profile?.skills.length !== 0 ? user?.profile?.skills.map((item, index) => (
              <Badge key={index} className="bg-green-100 text-green-700 px-3 py-1 rounded-md">{item}</Badge>
            )) : <span className='text-gray-600'>NA</span>}
          </div>
        </div>
        <div className='grid w-full max-w-sm items-center gap-1.5'>
          <Label className="text-md font-bold text-gray-800">Resume</Label>
          {isResume ? (
            <a target='_blank' href={user?.profile?.resume} className='text-blue-500 hover:underline cursor-pointer'>
              {user?.profile?.resumeOriginalName}
            </a>
          ) : <span className='text-gray-600'>NA</span>}
        </div>
      </div>
      <div className='max-w-4xl mx-auto bg-white rounded-2xl shadow-lg mt-5 p-8'>
        <h1 className='font-bold text-lg text-gray-800 mb-5'>Applied Jobs</h1>
        <AppliedJobTable />
      </div>
      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
