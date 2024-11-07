import { RadioGroup } from '@radix-ui/react-radio-group';
import React, { useEffect, useState } from 'react';
import { Label } from '../../@/components/ui/label';
import { RadioGroupItem } from '../../@/components/ui/radio-group';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '../redux/jobSlice';

const filterData = [
  {
    filterType: "location",
    array: ["Lahti", "Helsinki", "Oulu", "Tampere"]
  },
  {
    filterType: "category",
    array: ["3D Designer", "Developer", "Gaming Dev", "Mechanic"]
  },
  {
    filterType: "salary",
    array: ["1k", "1.3k", "2k"]
  }
];

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState('');
  const dispatch = useDispatch();
  const changeHandler = (value) => {
      setSelectedValue(value);
  }
  useEffect(()=>{
      dispatch(setSearchedQuery(selectedValue));
  },[selectedValue]);

  return (
    <div className='w-full bg-white p-4 rounded-md shadow-md'>
      <h1 className='font-bold text-lg text-gray-800 mb-3'>Filter Jobs</h1>
      <hr className='mb-3' />
      <RadioGroup value={selectedValue} onValueChange={changeHandler}>
        {filterData.map((data, index) => (
          <div key={index} className='mb-4'>
            <h1 className='font-semibold text-md text-gray-700 mb-2'>{data.filterType}</h1>
            {data.array.map((item, idx) => {
              const itemId = `id${index}-${idx}`;
              return (
                <div key={itemId} className='flex items-center space-x-2 my-1 hover:bg-gray-100 p-1 rounded transition duration-300'>
                  <RadioGroupItem 
                    value={item} 
                    id={itemId} 
                    className='hover:scale-105 transition duration-300' 
                    style={{ 
                      width: '16px', 
                      height: '16px', 
                      borderRadius: '50%', 
                      border: '2px solid #ccc', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center' 
                    }}
                  >
                    <div 
                      className='bg-blue-600 rounded-full' 
                      style={{ 
                        width: '8px', 
                        height: '8px', 
                        display: 'none' 
                      }} 
                    />
                  </RadioGroupItem>
                  <Label htmlFor={itemId} className='text-gray-600 text-sm'>{item}</Label>
                </div>
              );
            })}
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default FilterCard;
