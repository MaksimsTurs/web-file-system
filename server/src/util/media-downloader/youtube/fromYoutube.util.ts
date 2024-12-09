import type { DataToDownload, DataOfDownloadedItem } from "../mediaDownloader.type";

import FileSystem from '../../File-System/FileSystem.util'
import download from "./download.util";
import generateUUID from "../../generateUUID.util";
import { mergeVideoAndAudio, compressVideoAudio } from '../../videoaudioMergerAndCompressor.util'

export default async function fromYoutube(data: DataToDownload, toPath: string): Promise<DataOfDownloadedItem> {
  const [audioFilePath, videoFilePath] = await Promise.all([download(data.url, 'AUDIO'), download(data.url, 'VIDEO')]) as [string, string],
        isCompressOptionsUsed: boolean = Boolean(data.resize?.filter(Boolean) || data.compress)

  let outputName: string = `${data.name || generateUUID()}.mp4`

  const FILE_TMP_PATH: string = `${__dirname}\\tmp\\${outputName}`,
        FILE_OUTPUT_PATH: string = `${toPath}\\${outputName}`
  
  await FileSystem.manipulate.makeDirIfNotExist(`${__dirname}\\tmp`)

  //Merge downloaded youtube video with downloaded youtube audio and save into util/tmp
  await mergeVideoAndAudio(audioFilePath, videoFilePath, FILE_TMP_PATH)
  
  //If compress options used, compress the file and save into output path or 
  //move saved in util/tmp file to output path 
  if(isCompressOptionsUsed) {
    await compressVideoAudio(FILE_TMP_PATH, FILE_OUTPUT_PATH, data)
  } else {
    await FileSystem.manipulate.moveOne(FILE_TMP_PATH, FILE_OUTPUT_PATH)
  }

  return {
    fullPath: FILE_OUTPUT_PATH,
    name: outputName,
    type: 'FILE',
    size: (await FileSystem.manipulate.statistic(FILE_OUTPUT_PATH)).size
  }
}