import React from 'react'
import { Button } from './button'
import { Search } from 'lucide-react'

const Herosection = () => {
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
            className='outline-none border-none w-full'
          />
          <Button className="rounded-r-full bg-[#3b0764]">
            <Search className='h-5 w-5' />
          </Button>
        </div>


      </div>
    </div>
  )
}

export default Herosection