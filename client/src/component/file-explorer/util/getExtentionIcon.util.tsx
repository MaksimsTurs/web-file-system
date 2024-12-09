import Strings from "@/util/Strings/Strings.util";

import { File, FileAudio, FileCode2, FileImage, FileJson2, FileVideo } from "lucide-react";

export default function getExtentionIcon(filePath: string) {
  const extention: string = Strings.getFileExtention(filePath)

  switch(extention) {
    case 'mp4':
    case 'MP4':
      return <FileVideo strokeWidth={1}/>
    case 'json':
      return <FileJson2 strokeWidth={1}/>
    case 'mp3':
    case 'ogg':
      return <FileAudio strokeWidth={1}/>
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'webp':
      return <FileImage strokeWidth={1}/>
    case 'c':
    case 'cpp':
    case 'js':
    case 'ts':
    case 'jsx':
    case 'tsx':
    case 'py':
      return <FileCode2 strokeWidth={1}/>
    default:
      return <File strokeWidth={1}/>
  }
}