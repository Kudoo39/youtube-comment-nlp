import React from 'react'

const VideoHeader = ({ video }) => {
  return (
    <div className='mt-12 ml-12 flex-col items-center gap-4'>
      <img
        src={video?.thumbnails?.maxres.url}
        alt={video?.title}
        className='object-cover w-[480px] rounded-xl shadow-md'
      />
      <p className='text-lg font-semibold mt-3 text-gray-800 line-clamp-2'>
        {video?.title}
      </p>
    </div>
  )
}

export default VideoHeader
