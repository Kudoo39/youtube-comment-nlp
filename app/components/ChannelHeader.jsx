import React from 'react'

const ChannelHeader = ({ channel }) => {
  return (
    <div className='mt-12 ml-12 flex items-center gap-4 border-2 border-black p-2 rounded-md w-[80%] shadow-[0_4px_1px_1px_rgba(0,0,0,0.3)]'>
      <img
        src={channel?.thumbnails?.default.url}
        alt={channel?.title}
        className='w-12 h-12 object-contain rounded-[50%]'
      />
      <p className='text-lg font-semibold text-gray-800'>{channel?.title}</p>
    </div>
  )
}

export default ChannelHeader
