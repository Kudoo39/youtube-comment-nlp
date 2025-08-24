'use server'
import axios from 'axios'

const apiKey = process.env.API_KEY

export async function getComment(videoId) {
  const apiUrl = 'https://www.googleapis.com/youtube/v3/commentThreads'
  const url = `${apiUrl}?part=snippet&order=relevance&maxResults=10&videoId=${videoId}&key=${apiKey}`

  try {
    const response = await axios.get(url)
    if (response.status !== 200) {
      throw new Error('Failed to fetch comments')
    }

    const data = response.data
    const snippet = data.items.map((item) => item.snippet)

    // console.log('Data:', data)
    // console.log('Snippet:', snippet)
    return snippet
  } catch (error) {}
}

export async function getVideoDetails(videoId) {
  const apiUrl = 'https://www.googleapis.com/youtube/v3/videos'
  const url = `${apiUrl}?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${apiKey}`

  try {
    const response = await axios.get(url)
    if (response.status !== 200) {
      throw new Error('Failed to fetch comments')
    }

    const data = response.data
    const snippet = data.items.map((item) => item.snippet)

    // console.log('Data:', data)
    // console.log('Snippet:', snippet)
    return snippet[0]
  } catch (error) {}
}

export async function getChannelDetails(channelId) {
  const apiUrl = 'https://www.googleapis.com/youtube/v3/channels'
  const url = `${apiUrl}?part=snippet%2CcontentDetails%2Cstatistics&id=${channelId}&key=${apiKey}`

  try {
    const response = await axios.get(url)
    if (response.status !== 200) {
      throw new Error('Failed to fetch comments')
    }

    const data = response.data
    const snippet = data.items.map((item) => item.snippet)

    // console.log('Data:', data)
    // console.log('Snippet:', snippet)
    return snippet[0]
  } catch (error) {}
}
