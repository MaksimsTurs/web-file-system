import type { Request, Response } from "express";

import FileSystem from "../util/File-System/FileSystem.util";
import Console from "../util/Console/Console.util";
import isObjectEmpty from '../util/isObjectEmpty.util'
import imageConverterAndCompressor from '../util/imageConverterAndCompressor.util'
import { compressVideoAudio } from '../util/videoaudioMergerAndCompressor.util'

import ERROR from "../const/error.const";
import STRING from "../const/string.const";

export default async function editMediaFile(req: Request<any, any, { name?: string, content?: string, fullPath: string }>, res: Response) {
  try {
    const { name, fullPath, ...compressData } = req.body

    let newPath: string | undefined, extention: string | undefined

    extention = FileSystem.path.getFileExtention(fullPath)

    if(name) {
      newPath = FileSystem.path.rename(fullPath, `${name}.${extention}`)
      Console.info(`New path of the item is "${newPath}"`)

      await FileSystem.manipulate.moveOne(fullPath, newPath)
      Console.info(`Move "${fullPath}" into "${newPath}"`)
    }
    
    if(!isObjectEmpty(compressData)) {
      const isVideo: boolean = STRING.VIDEO_EXTENTION.includes(extention || ''),
            isImage: boolean = STRING.IMG_EXTENTION.includes(extention || '')
      
      if(isVideo) {
        await compressVideoAudio(newPath || fullPath, newPath || fullPath, req.body)
        Console.info(`Compress video from "${newPath || fullPath}"`)
      }
      
      if(isImage) {
        newPath = await imageConverterAndCompressor(newPath || fullPath, newPath || fullPath, req.body)
        Console.info(`Compress image from "${newPath || fullPath}"`)
      }
    }

    res.status(200).send({
      oldFullPath: fullPath,
      fullPath: newPath ? newPath : fullPath,
      name: name && FileSystem.path.getName(newPath!),
      size: (await FileSystem.manipulate.statistic(newPath || fullPath)).size
    })
    return
  } catch(error) {
    Console.error(error.message, error)
    res.status(500).send(ERROR.RESPONSE_500())
    return
  }
}