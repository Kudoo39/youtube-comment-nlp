'use client'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import AppBar from './components/AppBar'
import { getComment } from './action'

export default function Home() {
  const { data: session } = useSession()
  const [videoUrl, setVideoUrl] = useState('')
  const filterText = (inputText) => {
    const noEmoji = inputText.replace(/[\u{1F600}-\u{1F6FF}]/gu, '')
    const noSpecialChars = noEmoji.replace(/[^\p{L}\p{N}\s_]/gu, '')

    return noSpecialChars
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!videoUrl.includes('youtube.com/watch?v=')) {
      return
    }
    const videoId = videoUrl.split('youtube.com/watch?v=')[1].split('&')[0]

    const data = await getComment(videoId)
    const comment = data.map((item) => item.topLevelComment.snippet.textDisplay)
    let filteredComment = comment.map((item) => filterText(item))
    console.log('Filtered Comments:', filteredComment)
    console.log('Comments:', comment)
    // if (session) {
    //   const data = await getComment(videoId)
    // } else {
    //   alert('Please sign in to continue.')
    //   console.log('videoId:', videoId)
    // }
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
            <p className='ml-4 mt-12 text-[1.25rem]'>
              Paste the YouTube Video URL
            </p>
            <input
              className='m-4 p-2 rounded-lg border-2 border-black'
              type='text'
              placeholder='https://www.youtube.com/your-youtube-video-url'
              onChange={(e) => setVideoUrl(e.target.value)}
              value={videoUrl}
            />
            <button
              className='m-4 p-2 bg-linear-to-bl from-violet-200 to-fuchsia-200 bg-linear-to-bl hover:from-violet-300 hover:to-fuchsia-300 rounded-lg border-2 border-black'
              type='submit'
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </main>
  )
}
