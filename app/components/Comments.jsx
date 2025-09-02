import React from 'react'

const Comments = ({ comments, result }) => {
  return (
    <div className='mt-4'>
      {result?.comment_with_emotions?.map((comment, index) => (
        <div
          key={index}
          className='my-6 flex flex-col items-start gap-4 rounded-xl bg-white/70 backdrop-blur-sm shadow-md p-4 w-[90%]'
        >
          <p className='line-clamp-2 text-over text-lg font-medium text-gray-800'>
            {comment[0]}
          </p>
          <div className='flex flex-wrap gap-2'>
            {comment[1].map((emotion, index) => (
              <span
                key={index}
                className='px-3 py-1 text-sm rounded-full bg-gradient-to-r from-purple-300 to-blue-300 text-gray-800 font-semibold shadow-sm'
              >
                {emotion.label}: {parseFloat(emotion.score).toFixed(2)}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default Comments
