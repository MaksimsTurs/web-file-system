import type { Request, Response } from 'express'

import FileSystem from '../util/File-System/FileSystem.util'
import Console from '../util/Console/Console.util'

import ERROR from '../const/error.const'

export default async function copyItemTo(req: Request, res: Response) {
  try {
    await FileSystem.manipulate.copyMany(req.body.itemPaths, req.body.pathTo)
    res.status(200).send({ files: req.body.items })
  } catch(error) {
    Console.error(error.message, error)
    res.status(500).send(ERROR.RESPONSE_500())
  }
}