'use server'
import axios from 'axios'

export async function getComment(videoId) {
  const apiUrl = 'https://www.googleapis.com/youtube/v3/commentThreads'
  const apiKey = process.env.API_KEY
  const url = `${apiUrl}?part=snippet&order=relevance&videoId=${videoId}&key=${apiKey}`
  console.log(videoId, url)

  try {
    const response = await axios.get(url)
    if (response.status !== 200) {
      throw new Error('Failed to fetch comments')
    }

    const data = response.data
    const snippet = data.items.map((item) => item.snippet)

    console.log('Data:', data)
    console.log('Snippet:', snippet)
    return snippet
  } catch (error) {}
}
