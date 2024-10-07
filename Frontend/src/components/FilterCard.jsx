import { RadioGroup } from '@radix-ui/react-radio-group'
import React from 'react'
import { Label } from '../../@/components/ui/label'
import { RadioGroupItem } from '../../@/components/ui/radio-group'


const fitlerData = [

  {
    fitlerType: "location",
    array: ["Lahti", "Helsinki", "Oulu", "Tampere"]
  },
  {
    fitlerType: "category",
    array: [ "3D Designer", "Developer", "Gaming Dev", "Mechanic"]
  },
  {
    fitlerType: "salary",
    array: ["1k", "1.3k", "2k"]
  }

]
const FilterCard = () => {
  return (
    <div className='w-full bg-white p-3 rounded-md '>
      <h1 className='font-bold text-lg'>Filter Jobs</h1>
      <hr className='mt-3' />
      <RadioGroup>
          {
            fitlerData.map((data, index) => (

              <div>
                <h1 className='font-bold text-lg'>{data.fitlerType}</h1>
                {
                  data.array.map((item, idx) => {
                    const itemId = `id${index}-${idx}`
                    return (
                        <div className='flex items-center space-x-2 my-2'>
                            <RadioGroupItem value={item} id={itemId} />
                            <Label htmlFor={itemId}>{item}</Label>
                        </div>
                    )
                })
                }
              </div>
            ))
          }
      </RadioGroup>
    </div>
  )
}

export default FilterCard