import axios from "axios"

export default async function findTwitterVideoURL(url: string): Promise<string | undefined> {
  const html = await axios.get(`https://twitsave.com/info?url=${url}`, { responseType: 'text' })
  return Array.from(html.data.match(/https:\/\/video.twimg.com\/ext_tw_video.+/g) || []).at(0) as string | undefined
}