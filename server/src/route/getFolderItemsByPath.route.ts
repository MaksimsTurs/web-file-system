import type { Request, Response } from "express";
import sharp from 'sharp'

import ERROR from '../const/error.const'
import STRING from '../const/string.const'

import Console from "../util/Console/Console.util";
import FileSystem from '../util/File-System/FileSystem.util'
import testRegExp from '../util/testRegExp.util'
import { getFFMPEGMetadata } from '../util/videoaudioMergerAndCompressor.util'

import fsPromises from 'fs/promises'

export default async function getFolderItemsByPath(req: Request<any, any, { path: string }>, res: Response) {
  try {
    const { path } = req.body

    let folder: any[] = []

    Console.info(`Start reading "${path}" directory`)
    const directory = await fsPromises.opendir(path)

    for await(const item of directory) {
      const fullPath: string = `${path}\\${item.name}`

      if(testRegExp(STRING.DEFAULT_EXCLUDE_PATHS, fullPath)) {
        Console.info(`Skipped path "${fullPath}"`)
        continue
      }

      const isDirectory: boolean = item.isDirectory(),
            isMedia: boolean = [...STRING.AUDIO_EXTENTION, ...STRING.IMG_EXTENTION, ...STRING.VIDEO_EXTENTION].includes(FileSystem.path.getFileExtention(item.name)),
            isVideo: boolean = STRING.VIDEO_EXTENTION.includes(FileSystem.path.getFileExtention(fullPath))

      let dimension = { width: 0, height: 0 }

      Console.info(`Is "${fullPath}" Media file "${isMedia}"`)
      Console.info(`Is "${fullPath}" Directory "${isDirectory}"`)
      Console.info(`Pushed path "${fullPath}"`)

      if(isMedia) {
        if(isVideo) {
          dimension = await getFFMPEGMetadata(fullPath)
        } else {
          const metadata = await sharp(fullPath).metadata()
          dimension = { height: metadata.height || 0, width: metadata.width || 0 }
        }
      }

      folder.push({
        name: item.name,
        type: isDirectory ? STRING.FILE_EXPLORER_ITEM_TYPES.FOLDER : STRING.FILE_EXPLORER_ITEM_TYPES.FILE,
        size: !isDirectory ? (await fsPromises.lstat(fullPath)).size : undefined,
        content: (isMedia || isDirectory) ? undefined : await fsPromises.readFile(fullPath, { encoding: 'utf-8' }),
        files: isDirectory ? [] : undefined,
        dimension: isMedia ? dimension : undefined,
        fullPath,
      })
    }

    res.status(200).send({ folder })
  } catch(error) {
    res.status(500).send(ERROR.RESPONSE_500())
    Console.error(error.message)
    return
  }
}