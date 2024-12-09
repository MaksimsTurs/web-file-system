import type { Request, Response } from "express";

import FileSystem from "../util/File-System/FileSystem.util";
import Console from "../util/Console/Console.util";

import fsPromises from 'fs/promises'

import ERROR from "../const/error.const";

export default async function editTextFile(req: Request<any, any, { name?: string, content?: string, fullPath: string }>, res: Response) {
  try {
    const { name, fullPath, content } = req.body

    let newPath: string | undefined, extention: string | undefined

    if(name) {
      extention = FileSystem.path.getFileExtention(fullPath)
      newPath = FileSystem.path.rename(fullPath, `${name}.${extention}`)
      Console.info(`New path of the item is "${newPath}"`)

      await FileSystem.manipulate.moveOne(fullPath, newPath)
      Console.info(`Move "${fullPath}" into "${newPath}"`)
    }

    if(content) {
      Console.info(`Write content into "${newPath || fullPath}"`)
      await fsPromises.writeFile(newPath || fullPath, content, { encoding: 'utf-8' })
    }

    res.status(200).send({
      oldFullPath: fullPath,
      fullPath: newPath || fullPath,
      name: name && FileSystem.path.getName(newPath!),
      content,
      size: (await FileSystem.manipulate.statistic(newPath || fullPath)).size
    })
    return
  } catch(error) {
    Console.error(error.message, error)
    res.status(500).send(ERROR.RESPONSE_500())
    return
  }
}