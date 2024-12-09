import scss from './contextMenu.module.scss'
import '@/scss/global.scss'

import { Fragment, type PropsWithChildren, useEffect, useState } from "react";

import { FolderPlus, ClipboardList, Move, Trash2, CircleX, FilePlus } from 'lucide-react';

import useFileExplorer from '@/hooks/use-file-explorer/useFileExplorer.hook';

import { ExplorerModes } from '@/store/file-explorer/fileExplorer.enum';

export default function ContextMenu({ children }: PropsWithChildren) {
  const [isContextMenuOpen, setIsContextMenuOpen] = useState<boolean>(false),
        [contextMenuPosition, setContextMenuPosition] = useState<{ x: number, y: number }>({ x: 0, y: 0 }),
        Explorer = useFileExplorer()

  const isRoot: boolean = Explorer.location.numeric.length === 0

  const openContextMenu = (event: any) => {
    event.preventDefault()
    setContextMenuPosition({ x: event.pageX + 5, y: event.pageY - 55 })
    setIsContextMenuOpen(true)
  }

  const changeModeBykey = (modeKey: ExplorerModes) => {
    Explorer.modes.setModesValues({ [modeKey]: !Explorer.modes[modeKey as keyof typeof Explorer.modes] })
  }

  useEffect(() => {
    window.addEventListener('click', () => setIsContextMenuOpen(false))
  }, [])

  useEffect(() => {
    if(isRoot) {
      Explorer.modes.setModesValues({
        IS_COPY_MODE: false, 
        IS_DELETE_MODE: false, 
        IS_INSERT_FILE_MODE: false,
        IS_INSERT_FOLDER_MODE: false, 
        IS_MOVE_MODE: false
      })
    }
  }, [Explorer.location.numeric])
  
  return(
    <div className={scss.context_menu_container} onContextMenu={openContextMenu}>
      {children}
      <div style={{ top: `${contextMenuPosition.y}px`, left: `${contextMenuPosition.x}px` }} className={`${scss.context_menu} ${!isContextMenuOpen ? scss.context_menu_hidden : ''}`}> 
        {isRoot ? 
          <div className={`${scss.context_menu_disabled} flex-row-center-normal-medium`}>
            <CircleX strokeWidth={1}/>
            <p>Context menu is enabled only on Explorer page and deeper than root.</p>
          </div> :
          <Fragment>
            <div onClick={() => changeModeBykey(ExplorerModes.IS_INSERT_FOLDER_MODE)} className={`${scss.context_menu_item_container} flex-row-center-normal-small`}>
              <FolderPlus strokeWidth={1}/>
              <p>Insert Folder</p>
            </div>
            <div onClick={() => changeModeBykey(ExplorerModes.IS_INSERT_FILE_MODE)} className={`${scss.context_menu_item_container} flex-row-center-normal-small`}>
              <FilePlus strokeWidth={1}/>
              <p>Insert File</p>
            </div>
            <div onClick={() => changeModeBykey(ExplorerModes.IS_DELETE_MODE)} className={`${Explorer.modes.IS_DELETE_MODE ? scss.context_menu_select : ''} ${scss.context_menu_item_container} flex-row-center-normal-small`}>
              <Trash2 strokeWidth={1}/>
              <p>Delete</p>
            </div>
            <div onClick={() => changeModeBykey(ExplorerModes.IS_COPY_MODE)} className={`${Explorer.modes.IS_COPY_MODE ? scss.context_menu_select : ''} ${scss.context_menu_item_container} flex-row-center-normal-small`}>
              <ClipboardList strokeWidth={1}/>
              <p>Copy</p>
            </div>
            {/* <div onClick={() => changeModeBykey(EExplorerModes.IS_MOVE_MODE)} className={`${Explorer.modes.IS_MOVE_MODE ? scss.context_menu_select : ''} ${scss.context_menu_item_container} flex-row-center-normal-small`}>
              <Move strokeWidth={1}/>
              <p>Move</p>
            </div> */}
          </Fragment>}
      </div>
    </div>
  )
}