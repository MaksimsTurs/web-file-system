import ffmpeg from 'fluent-ffmpeg'

import fsPromises from 'fs/promises'
import fsSync from 'fs'

import FileSystem from './File-System/FileSystem.util'

export async function getFFMPEGMetadata(fullPath: string): Promise<{ width: number, height: number }> {
  return new Promise((resolve, reject) => {
    ffmpeg.ffprobe(fullPath, ((error, data) => {
      if(error) {
        reject(error)
      } else {
        data.streams.find(stream => (stream.width && stream.height) && resolve({ width: stream.width || 0, height: stream.height || 0 }))
      }
    }))
  })
}

export async function compressVideoAudio(input: string, output: string, option: any): Promise<void> {
  const isPathsEqual: boolean = input === output

  if(isPathsEqual) {
    const tmpPath: string = `${__dirname}\\tmp`

    if(!fsSync.existsSync(tmpPath)) {
      await fsPromises.mkdir(tmpPath)
    }

    await FileSystem.manipulate.moveOne(input, `${tmpPath}\\${FileSystem.path.getName(input)}`)
    
    //tmp path will be input and output path will be earliest path
    output = input
    input = `${tmpPath}\\${FileSystem.path.getName(input)}` 
  }
  
  return new Promise((resolve, reject) => {
    ffmpeg(input)
      .output(output)
      .videoCodec('libx264')
      .size(`${option?.compress || 50}%`)
      //TODO:
      // .on('start')
      // .on('progress'),
      .on('end', async() => {
        isPathsEqual && await FileSystem.manipulate.deleteOne(input)
        resolve(void 0)
      })
      .on('error', reject)
      .run()
    })
}

export function mergeVideoAndAudio(audioPath: string, videoPath: string, output: string): Promise<void> {
  return new Promise((resolve, reject) => {    
    ffmpeg()
      .addInput(audioPath)
      .addInput(videoPath)
      .outputOptions('-c:v copy')
      .outputOptions('-c:a aac')
      .output(output)
      //TODO:
      // .on('start')
      // .on('progress'),
      .on('end', () => resolve())
      .on('error', reject)
      .run()
  })
}