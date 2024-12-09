import scss from './header.module.scss'
import '@/scss/global.scss'

import { ArrowLeft, Settings } from 'lucide-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import Button from '../button/button.component'

import useFileExplorer from '@/hooks/use-file-explorer/useFileExplorer.hook'

import { ExplorerMoveDirections } from '@/store/file-explorer/fileExplorer.enum'

export default function Header() {
  const location = useLocation(),
        navigate = useNavigate(),
        Explorer = useFileExplorer()

  const goBack = () => {
    if(location.pathname !== '/') {
      navigate(-1)
      if(location.pathname === '/setting') Explorer.location.move({ direction: ExplorerMoveDirections.BACKWARD, deep: -Explorer.location.numeric.length })
      return
    }

    if(Object.values(Explorer.modes).filter(value => value && typeof value === 'boolean').length) {
      Explorer.modes.setModesValues({
        IS_COPY_MODE: false, 
        IS_DELETE_MODE: false, 
        IS_INSERT_FILE_MODE: false, 
        IS_INSERT_FOLDER_MODE: false, 
        IS_MOVE_MODE: false
      })
      return
    } 

    Explorer.location.move({ direction: ExplorerMoveDirections.BACKWARD })
  }

  return(
    <header className={`${scss.header_container} flex-row-center-normal-small`}>
      <Button onClick={goBack}><ArrowLeft strokeWidth={1}/></Button>
      <Link to='/setting'><Button><Settings strokeWidth={1}/></Button></Link>
    </header>
  )
}