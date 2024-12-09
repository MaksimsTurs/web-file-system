import type { Request, Response } from "express";

import Console from "../util/Console/Console.util";

import ERROR from "../const/error.const";

export default async function getMediaFileByURL(req: Request<any, any, any, { url: string }>, res: Response) {
  try {
    Console.info(`Send media file "${req.query.url}"`)
    res.sendFile(req.query.url)
  } catch(error) {
    Console.error(error.message, error)
    res.status(500).send(ERROR.RESPONSE_500())
    return
  }
}