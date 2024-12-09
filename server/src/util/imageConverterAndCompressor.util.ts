import sharp from 'sharp'

import fsSync from 'fs'
import fsPromises from 'fs/promises'

import FileSystem from './File-System/FileSystem.util'

export default async function imageConverterAndCompressor(input: string, output: string, data: any): Promise<string> {
  const isPathsEqual: boolean = input === output

  output = `${output.replace(/\.*(png|jpeg|jpg)/, '.webp')}`

  if(isPathsEqual) {
    const tmpPath: string = `${__dirname}\\tmp`

    if(!fsSync.existsSync(tmpPath)) {
      await fsPromises.mkdir(tmpPath)
    }

    await FileSystem.manipulate.moveOne(input, `${tmpPath}\\${FileSystem.path.getName(input)}`)
    //tmp path will be input and output path will be earliest path
    output = `${input.replace(/\.*(png|jpeg|jpg)/, '.webp')}`
    input = `${tmpPath}\\${FileSystem.path.getName(input)}` 
  }

  //Compress options
  const quality: number = parseInt(data.compress || '100'),
        alphaQuality: number = 20,
        effort: number = 6

  //Resize options
  const height: number | undefined = data?.resize?.at(1),
        width: number | undefined = data?.resize?.at(1)

  sharp.cache({ files: 0 })
  await sharp(input).toFormat('webp', { quality, alphaQuality, effort }).resize({ height, width }).toFile(output)
  isPathsEqual && await FileSystem.manipulate.deleteOne(input)

  return output
}