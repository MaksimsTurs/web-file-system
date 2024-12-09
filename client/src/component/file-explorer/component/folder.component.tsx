import scss from '../scss/folder.module.scss'
import '@/scss/global.scss'

import type { FolderProps } from '../fileExplorer.type'

import { FolderClosed } from 'lucide-react'

import useFileExplorer from '@/hooks/use-file-explorer/useFileExplorer.hook'

import { ExplorerMoveDirections } from '@/store/file-explorer/fileExplorer.enum'

export default function Folder({ folder, index }: FolderProps) {
  const Explorer = useFileExplorer()

  const goInsideFolder = () => {
    Explorer.location.move({ to: folder.name, deep: index, direction: ExplorerMoveDirections.FORWARD })
  }

  return(
    <div onClick={Explorer.modes.IS_DELETE_MODE ? undefined : goInsideFolder} className={`${scss.folder_container} flex-row-center-normal-medium`}>
      <FolderClosed strokeWidth={1}/>
      <p>{folder?.alias || folder.name}</p>
    </div>
  )
}