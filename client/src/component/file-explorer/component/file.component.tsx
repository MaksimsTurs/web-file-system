import scss from '../scss/file.module.scss'
import '@/scss/global.scss'

import type { FileProps } from "../fileExplorer.type";

import { File as _File } from "lucide-react";
import { type CSSProperties, type MouseEvent, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import getExtentionIcon from '../util/getExtentionIcon.util';

import { IMG_EXTENTIONS, VIDEO_EXTENTIONS } from '@/const';

import Strings from '@/util/Strings/Strings.util';

import useFileExplorer from '@/hooks/use-file-explorer/useFileExplorer.hook';

export default function File({ file, index }: FileProps) {
  const [isHovered, setIsHovered] = useState<boolean>(false),
        [previewPosition, setPreviewPosition] = useState<'left' | 'right'>('left'),
        timerIDRef = useRef<any>(),
        Explorer = useFileExplorer(),
        fileSourceURL: string = `http://localhost:4000/asset?url=${file.fullPath}`,
        isCopyDeleteMoveModeUsed: boolean = Explorer.modes.IS_COPY_MODE || Explorer.modes.IS_DELETE_MODE || Explorer.modes.IS_MOVE_MODE

  const previewStyle: CSSProperties = {
    left:                    previewPosition === 'left' ? '0%' : '50%',
    borderTopRightRadius:    previewPosition === 'left' ? '5px' : '0px',
    borderBottomRightRadius: previewPosition === 'left' ? '5px' : '0px',
    borderTopLeftRadius:     previewPosition === 'left' ? '0px' : '5px',
    borderBottomLeftRadius:  previewPosition === 'left' ? '0px' : '5px',
  }

  const hoverFile = (event: MouseEvent<HTMLAnchorElement>) => {
    if((window.innerWidth / 2) >= event.pageX) setPreviewPosition('right')
    else                                       setPreviewPosition('left')

    if(event.type === 'mouseenter') {
      timerIDRef.current = setTimeout(() => setIsHovered(true), 2000)
    } else if(event.type === 'mouseleave') {
      clearTimeout(timerIDRef.current)
      setIsHovered(false)
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', (event) => {
      if(event.key === 'Escape') setIsHovered(false)
    })
  }, [])

  return(
    <Link 
      to={isCopyDeleteMoveModeUsed ? '/' : `/item/${index}`} 
      onMouseEnter={!isCopyDeleteMoveModeUsed ? hoverFile : undefined} 
      onMouseLeave={!isCopyDeleteMoveModeUsed ? hoverFile : undefined}>
      <div className={`${isHovered ? '' : scss.file_preview_background_hidden} ${scss.file_preview_background}`}></div>
      <div style={previewStyle} className={`${isHovered ? '' : scss.file_information_container_hidden} ${scss.file_information_container}`}>
        <p className={scss.file_preview_name}>{file.name}</p>
        {isHovered && (
          IMG_EXTENTIONS.includes(Strings.getFileExtention(file.name)) ?
          <img className={scss.file_preview_content_file} src={fileSourceURL}/> :
          VIDEO_EXTENTIONS.includes(Strings.getFileExtention(file.name)) ?
          <video controls className={scss.file_preview_content_file} src={fileSourceURL}/> :
          <pre className={scss.file_preview_content}>{file?.content}</pre>
        )}
      </div>
      <div className={`${scss.file_container} flex-row-center-normal-medium`}>
        {getExtentionIcon(file.name)}
        <p>{file.name}</p>
      </div>
    </Link>
  )
}