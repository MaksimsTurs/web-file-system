import STRING from '../../../const/string.const.js'

import determinateFileType from './determinateFileType.util'
import handleVideo from './handleVideo.util'
import handleImage from './handleImage.util'
import FileSystem from '../../File-System/FileSystem.util'
import generateUUID from '../../generateUUID.util'
import findTwitterVideoURL from './findTwitterVideoURL.util'
import imageConverterAndCompressor from '../../imageConverterAndCompressor.util'
import { compressVideoAudio } from '../../videoaudioMergerAndCompressor.util'

import type { DataOfDownloadedItem, DataToDownload } from '../mediaDownloader.type.js'

export default async function fromTwitter(data: DataToDownload, toPath: string): Promise<DataOfDownloadedItem> {
  const FILE_TYPE = await determinateFileType(data.url),
        isCompressOptionsUsed: boolean = Boolean(data?.compress || data?.resize?.filter(Boolean)),
        outputName: string = `${data.name || generateUUID()}.${FILE_TYPE?.extention ? FILE_TYPE.extention : FILE_TYPE?.type === STRING.FILE_EXPLORER_ITEM_TYPES.IMAGE ? 'webp' : 'mp4'}`

  await FileSystem.manipulate.makeDirIfNotExist(`${__dirname}\\tmp`)

  const FILE_TMP_PATH: string = `${__dirname}\\tmp\\${outputName}`,
        FILE_OUTPUT_PATH: string = `${toPath}\\${outputName}`

  switch(FILE_TYPE?.type) {
    case STRING.FILE_EXPLORER_ITEM_TYPES.IMAGE:
      await handleImage(data, isCompressOptionsUsed ? FILE_TMP_PATH : FILE_OUTPUT_PATH)

      if(isCompressOptionsUsed) {
        await imageConverterAndCompressor(FILE_TMP_PATH, FILE_OUTPUT_PATH, data)
      }
      break
    case STRING.FILE_EXPLORER_ITEM_TYPES.VIDEO:
      const videoURL: string | undefined = await findTwitterVideoURL(data.url)

      if(!videoURL) {
        throw Error('Video URL would not finded!')
      }

      await handleVideo(videoURL, isCompressOptionsUsed ? FILE_TMP_PATH : FILE_OUTPUT_PATH)
        
      if(isCompressOptionsUsed) {
        await compressVideoAudio(FILE_TMP_PATH, FILE_OUTPUT_PATH, data)
      }

      await FileSystem.manipulate.deleteOne(FILE_TMP_PATH)
      break
  }

  return {
    name: outputName,
    fullPath: FILE_OUTPUT_PATH,
    type: 'FILE',
    size: (await FileSystem.manipulate.statistic(FILE_OUTPUT_PATH)).size
  }
}