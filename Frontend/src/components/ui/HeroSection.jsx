import React, { useState } from 'react'
import { Button } from './button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '../../redux/jobSlice';

const Herosection = () => {
  const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }
  return (
    <div className='text-center'>
      <div className='flex flex-col gap-5 my-10'>
        <span className=' mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#dc2626]'>Discover New Opportunities Today!</span>
        <h1 className='text-5xl font-bold'>Search , Apply & <br /> Start You'r <span className='text-[#3b0764]'>Journey</span></h1>
        <p>Find full-time, part-time, and remote jobs that match your skills and interests, tailored to Finland’s growing industries.</p>
        <div className='flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto'>
          <input
            type='text'
            placeholder='Find Your Dream Job in Finland '
            onChange={(e) => setQuery(e.target.value)}
            className='outline-none border-none w-full'
          />
          <Button  onClick={searchJobHandler} className="rounded-r-full bg-[#3b0764]">
            <Search className='h-5 w-5' />
          </Button>
        </div>


      </div>
    </div>
  )
}

export default Herosection