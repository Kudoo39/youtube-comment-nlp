import Image from 'next/image'
import AppBar from './components/AppBar'

export default function Home() {
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
        </div>
      </div>
    </main>
  )
}
