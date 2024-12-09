import type { Request, Response } from "express";

import Console from "../util/Console/Console.util";
import mediaDownloader from "../util/media-downloader/mediaDownloader.util";

import ERROR from "../const/error.const";

export default async function downloadFilesFromURL(req: Request, res: Response) {
  try {
    res.status(200).send({ files: await mediaDownloader(req.body.filesToDownload, req.body.saveInToPath) })
  } catch(error) {
    Console.error(error.message, error)
    res.status(500).send(ERROR.RESPONSE_500())
    return
  }
}