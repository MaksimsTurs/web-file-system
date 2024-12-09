import scss from './explorer.module.scss'
import '@/scss/global.scss'

import File from './component/file.component'
import Folder from './component/folder.component'
import BreadCrumbs from './component/breadCrumbs.component'
import BigButton from '../big-button/bigButton.component'

import useFileExplorer from '@/hooks/use-file-explorer/useFileExplorer.hook'

import { CheckCircle, FileCheck2 } from 'lucide-react'
import { useEffect, useState } from 'react'

import { ExplorerItemTypes } from '@/store/file-explorer/fileExplorer.enum'

import type { FileExplorer } from '@/store/file-explorer/fileExplorer.type'

export default function FileExplorer() {
  const Explorer = useFileExplorer(),
        [fileNames, setFileNames] = useState<FileExplorer[]>([]),
        currentExplorer = Explorer.getExplorer(),
        isCopyDeleteMoveModeUsed: boolean = Explorer.modes.IS_COPY_MODE || Explorer.modes.IS_DELETE_MODE || Explorer.modes.IS_MOVE_MODE

  const insertToFileNamesArray = (itemToInsert: FileExplorer) => {
    setFileNames(prev => {
      const existedItem = prev.find(item => item.fullPath === itemToInsert.fullPath)
      if(existedItem) return prev.filter(item => item.fullPath !== itemToInsert.fullPath)

      return [...prev, itemToInsert]
    })
  }

  const fileNamesIncludeName = (itemToFind: FileExplorer) => {
    return fileNames.find(item => item.fullPath === itemToFind.fullPath)
  }

  const confirmAction = () => {
    if(Explorer.modes.IS_COPY_MODE)   Explorer.actions.copyItemsTo(fileNames)
    if(Explorer.modes.IS_DELETE_MODE) Explorer.actions.deleteItemsFrom(fileNames)
    // if(Explorer.modes.IS_MOVE_MODE)   Explorer.actions.moveItemsTo(fileNames)

    setFileNames([])
  }

  useEffect(() => {
    setFileNames([])
  }, [isCopyDeleteMoveModeUsed])

  return(
    <div className={`${scss.explorer_container} flex-column-normal-normal-none`}>
      <BreadCrumbs/>
      {isCopyDeleteMoveModeUsed && (
        <div className='flex-row-center-normal-medium'>
          <BigButton 
            className={scss.explorer_confirm_action_button} 
            onClick={confirmAction}>
              {Explorer.modes.IS_COPY_MODE ? 'Copy' : Explorer.modes.IS_DELETE_MODE ? 'Delete' : Explorer.modes.IS_MOVE_MODE ? 'Move' : undefined}
          </BigButton>
          <div className='flex-row-center-center-medium'>
            <FileCheck2 strokeWidth={1}/>
            <p>{fileNames.length}</p>
          </div>
        </div>)}
      <div className={scss.explorer_body}>
        {currentExplorer.map((folder, index) => (
          folder.type === ExplorerItemTypes.FILE ? 
            <div style={{ position: isCopyDeleteMoveModeUsed ? 'relative' : 'static' }}  key={folder.name} className={scss.explorer_selected_container}>
              {isCopyDeleteMoveModeUsed && (
                <CheckCircle 
                  onClick={() => insertToFileNamesArray(folder)} 
                  className={`${fileNamesIncludeName(folder) ? scss.explorer_selected_icon_selected : ''} ${scss.explorer_selected_icon}`} 
                  strokeWidth={1}/>)}
              <File key={folder.name} index={index} file={folder}/>
            </div> : 
            <div style={{ position: isCopyDeleteMoveModeUsed ? 'relative' : 'static' }} key={folder.name} className={scss.explorer_selected_container}>
              {isCopyDeleteMoveModeUsed && (
                <CheckCircle 
                  onClick={() => insertToFileNamesArray(folder)} 
                  className={`${fileNamesIncludeName(folder) ? scss.explorer_selected_icon_selected : ''} ${scss.explorer_selected_icon}`} 
                  strokeWidth={1}/>)}
              <Folder key={folder.name} index={index} folder={folder}/>
            </div>))}
      </div>
    </div>
  )
}