import React from 'react'
const Result = ({ result }) => {
  return (
    <div className='mt-4 mb-2 flex flex-col gap-3 max-w-[420px]'>
      {result?.Result?.map((item, index) => (
        <div
          key={index}
          className='flex items-center justify-between p-3 rounded-lg bg-white shadow-md hover:shadow-lg transition'
        >
          <p className='font-semibold text-gray-800'>{item[0]}</p>
          <div className='flex items-center gap-2'>
            <div className='h-2 w-24 bg-gray-200 rounded'>
              <div
                className='h-2 bg-purple-400 rounded'
                style={{ width: `${item[1] * 100}%` }}
              ></div>
            </div>
            <p className='text-sm text-gray-600'>{item[1]}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Result
