import express, { type Express } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import startListenServer from './configuration/startListenServer.config'

import getFolderItemsByPath from './route/getFolderItemsByPath.route'
import editTextFile from './route/editTextFile.route'
import editMediaFile from './route/editMediaFile.route'
import getMediaFileByURL from './route/getMediaFileByURL.route'
import copyItemsTo from './route/copyItemsTo.route'
import deleteItemsFrom from './route/deleteItemsFrom.route'
import downloadFilesFromURL from './route/downloadFilesFromURL.route'

const Server: Express = express()

dotenv.config()

Server
.use(cors())
.use(express.json())
.use(express.urlencoded({ extended: true }))
.post('/get/folder', getFolderItemsByPath)
.post('/edit/text-file', editTextFile)
.post('/edit/media-file', editMediaFile)
.post('/delete/items', deleteItemsFrom)
.post('/copy/items', copyItemsTo)
.post('/insert/download-files-from-url', downloadFilesFromURL)
.all('/asset', getMediaFileByURL)
.listen(process.env.SERVER_DEV_PORT, startListenServer)

export default Server