import axios from 'axios'
import fsSync from 'fs'

export default async function handleVideo(videoURL: string, output: string): Promise<void> {
  const videoStream = await axios.get(videoURL, { responseType: 'stream' })
  
  return new Promise((resolve, reject) => {
    videoStream.data
      .on('end', () => resolve(void 0))
      // .on('data')
      //TODO:
      .on('error', reject)
      .pipe(fsSync.createWriteStream(output))
  })
}