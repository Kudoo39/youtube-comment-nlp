'use client'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import AppBar from './components/AppBar'
import { getComment, getVideoDetails, getChannelDetails } from './action'
import ChannelHeader from './components/ChannelHeader'
import VideoHeader from './components/VideoHeader'

export default function Home() {
  const { data: session } = useSession()
  const [videoUrl, setVideoUrl] = useState('')
  const [isLoading, setLoading] = useState(false)
  const [comments, setComments] = useState([])
  const [channel, setChannel] = useState({})
  const [video, setVideo] = useState({})
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

    setLoading(true)
    const data = await getComment(videoId)
    const channelId = data[0].channelId
    const videoData = await getVideoDetails(videoId)
    const channelData = await getChannelDetails(channelId)
    setChannel(channelData)
    setVideo(videoData)
    const comment = data.map((item) => item.topLevelComment.snippet.textDisplay)
    let filteredComment = comment.map((item) => filterText(item))
    setComments(filteredComment)
    setVideoUrl('')
    setLoading(false)
    // if (session) {
    //   const data = await getComment(videoId)
    // } else {
    //   alert('Please sign in to continue.')
    //   console.log('videoId:', videoId)
    // }
  }

  return (
    <main className='bg-gray-200 flex flex-col min-h-screen text-black'>
      <AppBar />
      <div className='grid grid-cols-3 gap-4'>
        <div className='bg-gray-200 min-h-screen'>
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
            {isLoading ? (
              <button className='m-4 p-2 w-17 bg-linear-to-bl from-violet-200 to-fuchsia-200 hover:from-violet-300 hover:to-fuchsia-300 rounded-lg border-2 border-black'>
                ...
              </button>
            ) : (
              <button
                className='m-4 p-2 bg-linear-to-bl from-violet-200 to-fuchsia-200 hover:from-violet-300 hover:to-fuchsia-300 rounded-lg border-2 border-black'
                type='submit'
              >
                Submit
              </button>
            )}
          </form>
        </div>
        <div className='min-h-screen col-span-2 bg-gradient-to-br from-pink-200'>
          <div className='col-span-2'>
            <ChannelHeader channel={channel} />
            <VideoHeader video={video} />
          </div>
        </div>
      </div>
    </main>
  )
}
