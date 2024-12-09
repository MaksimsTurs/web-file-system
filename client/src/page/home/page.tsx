import scss from './page.module.scss'

import FileExplorer from "@/component/file-explorer/fileExplorer.component";
import InsertFile from './component/insertFile.component';

import { Fragment } from 'react';

import useFileExplorer from '@/hooks/use-file-explorer/useFileExplorer.hook';

export default function Page() {
  const Explorer = useFileExplorer()

  return (
    <Fragment>
      {Explorer.modes.IS_INSERT_FILE_MODE ? 
        <div style={{ padding: '5rem', width: '100%' }}><InsertFile/></div> : 
        <FileExplorer/>}
    </Fragment>
  )
}