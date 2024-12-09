import type { CopyOptions, Dir, RmOptions, Stats } from "fs"

export type FileSystemUtil = {
  is: FileSystemIs
  manipulate: FileSystemManipulate
  path: FileSystemPath
}

export type FileSystemIs = {
  directory: (path: string) => Promise<boolean>
  file: (path: string) => Promise<boolean>
}

export type FileSystemPath = {
  getName: (path: string) => string
  getFileExtention: (path: string) => string
  rename: (path: string, newName: string) => string
}

export type FileSystemManipulate = {
  copyOne: (from: string, to: string, options?: CopyOptions) => Promise<void>
  copyMany: (from: string[], to: string, options?: CopyOptions) => Promise<void>
  deleteOne: (from: string, options?: RmOptions) => Promise<void>
  deleteMany: (from: string[], options?: RmOptions) => Promise<void>
  moveOne: (from: string, to: string) => Promise<void>
  moveMany: (from: string[], to: string) => Promise<void>
  openDir: (path: string) => Promise<Dir>
  statistic: (path: string) => Promise<Stats>,
  readFile: (path: string, options: ReadFileOptions) => Promise<string>
  makeDirIfNotExist: (path: string) => Promise<void>
}

export type ReadFileOptions = {
  encoding: BufferEncoding
}