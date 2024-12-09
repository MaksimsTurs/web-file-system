import STRING from '../../const/string.const'

import fromYoutube from './youtube/fromYoutube.util'
import fromTwitter from './twitter/fromTwitter.util.js'

import type { DataOfDownloadedItem, DataToDownload } from './mediaDownloader.type'

function determinateFileSource(url: string) {
  const splited = url.split(/\//)
  for(let index = 0; index < splited.length; index++) {
    if(STRING.FILE_POSSIBLE_SOURCE.includes(splited[index].trim())) return STRING.FILE_POSSIBLE_SOURCE_KEYS[splited[index].trim()]
  }
}

export default async function(toDownload: DataToDownload[], toPath: string) {
  const result: DataOfDownloadedItem[] = []
  
  for(let index = 0; index < toDownload.length; index++) {
    const fileSource = determinateFileSource(toDownload[index].url)
  
    switch(fileSource) {
      case STRING.FILE_POSSIBLE_SOURCE_KEYS["youtu.be"]:
        result.push(await fromYoutube(toDownload[index], toPath))
        break
      case STRING.FILE_POSSIBLE_SOURCE_KEYS["pbs.twimg.com"]:
      case STRING.FILE_POSSIBLE_SOURCE_KEYS["x.com"]:
        result.push(await fromTwitter(toDownload[index], toPath))
        break
      default:
        break
    }
  }

  return result
}