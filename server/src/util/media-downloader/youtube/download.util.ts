import ydtl, { type videoFormat, type videoInfo } from '@distube/ytdl-core'

import fsSync from 'fs'

import STRING from '../../../const/string.const'

import generateUUID from '../../generateUUID.util'

export default async function download(URL: string, fileType: keyof typeof STRING.FILE_EXPLORER_ITEM_TYPES) {
  const youtubeVideo: videoInfo = await ydtl.getInfo(URL),
        youtubeVideoFormat: videoFormat = ydtl.chooseFormat(
          youtubeVideo.formats, 
          { filter: fileType === STRING.FILE_EXPLORER_ITEM_TYPES.AUDIO ? 
            (format) => format.hasAudio : 
            (format) => ['720p', '480p', '240p'].includes(format.qualityLabel) && format.hasVideo }
        )
  
  const OUTPUT_FILE_NAME: string = generateUUID(),
        FILE_EXTENTION: string = fileType === STRING.FILE_EXPLORER_ITEM_TYPES.VIDEO ? 'mp4' : 'mp3',
        OUTPUT_FILE_PATH: string = `${__dirname}\\${OUTPUT_FILE_NAME}.${FILE_EXTENTION}`
  
  return new Promise((resolve, reject) => {
    ydtl
      .downloadFromInfo(youtubeVideo, { format: youtubeVideoFormat })
      //TODO:
      // .on('data')
      .on('end', () => resolve(OUTPUT_FILE_PATH))
      .on('error', reject)
      .pipe(fsSync.createWriteStream(OUTPUT_FILE_PATH))
  })
}