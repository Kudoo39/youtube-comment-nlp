'use client'
import Image from 'next/image'
import AppBar from './components/AppBar'

export default function Home() {
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted!')
  }

  return (
    <main className='bg-main-grey flex flex-col min-h-screen text-black'>
      <AppBar />
      <div className='grid grid-cols-3 gap-4'>
        <div className='bg-main-grey min-h-screen'>
          <p className='m-4 text-[4rem] font-bold font-mono'>YVA</p>
          <p className='m-4 text-[1.5rem] font-normal font-mono'>
            YouTube Video Analysis
          </p>
          <p className='ml-4 mt-2 font-bold'>
            By: <a href='https://github.com/Kudoo39'>Kudoo39</a>
          </p>
          <form onSubmit={handleSubmit}> 
            <p className='ml-4 mt-12 text-[1.25rem]'>Paste the YouTube Video URL</p>
            <input className='m-4 p-2 rounded-lg border-2 border-black' type='text' placeholder='https://www.youtube.com/your-youtube-video-url'
            value="" />
            <button className='m-4 p-2 rounded-lg border-2 border-black' type='submit'>Submit</button>
          </form>
        </div>
      </div>
    </main>
  )
}
