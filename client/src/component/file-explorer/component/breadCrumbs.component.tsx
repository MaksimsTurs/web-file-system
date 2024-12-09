import scss from '../scss/breadCrumbs.module.scss'
import '@/scss/global.scss'

import { ExplorerMoveDirections } from '@/store/file-explorer/fileExplorer.enum'

import useFileExplorer from '@/hooks/use-file-explorer/useFileExplorer.hook'

export default function BreadCrumbs() {
  const Explorer = useFileExplorer(),
        location = Explorer.location.string

  const goBackTo = (deep: number) => {
    Explorer.location.move({ deep, direction: ExplorerMoveDirections.BACKWARD  })
  }
  
  return(
    <div className={`${scss.breadcrumbs_container} flex-row-center-normal-none`}>
      {location.map((crumb, index) => <p key={crumb} onClick={() => goBackTo(index)}>{index === 0 ? 'root' : crumb}</p>)}
    </div>
  )
}