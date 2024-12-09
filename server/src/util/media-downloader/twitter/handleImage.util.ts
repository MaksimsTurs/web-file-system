import fsSync from 'fs'
import axios from 'axios'

import type { DataToDownload } from '../mediaDownloader.type'

export default async function handleImage(data: DataToDownload, output: string): Promise<void> {
  const imageStream = await axios.get(data.url, { responseType: 'stream' })
        
  return new Promise((resolve, reject) => {
    imageStream.data
      .on('end', () => resolve())
      //TODO:
      // .on('data')
      .on('error', reject)
      .pipe(fsSync.createWriteStream(output))
  })
}