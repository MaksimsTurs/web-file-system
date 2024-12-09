import scss from './page.module.scss'
import '@/scss/global.scss'

import TextInput from "@/component/form/text-input/textInput.component";
import PreviewPaths from "./component/previewPaths.component";

import useFileExplorer from '@/hooks/use-file-explorer/useFileExplorer.hook';

import { useState } from 'react';

import type { InsertNewPathState } from './page.type';

import { ExplorerConfiguratinsKeys } from '@/store/file-explorer/fileExplorer.enum';

export default function Page() {
  const Explorer = useFileExplorer(),
        [newPathState, setNewPathState] = useState<InsertNewPathState>(),
        onUndefined = { workSpaces: undefined, excludePaths: undefined }

  const getNewPathName = (key: ExplorerConfiguratinsKeys, event: any) => {
    setNewPathState(prev => ({...prev || onUndefined, [key]: {...prev?.[key] || {}, path: event.target.value }}))
  }

  const getNewPathAlias = (key: ExplorerConfiguratinsKeys, event: any) => {
    setNewPathState(prev => ({...prev || onUndefined, [key]: {...prev?.[key] || {}, alias: event.target.value }}))
  }

  const insertNewPath = (key: ExplorerConfiguratinsKeys) => {
    Explorer.configurations.insertPath({ toArray: key, value: newPathState?.[key] })
    setNewPathState(prev => ({...prev || onUndefined, [key]: undefined }))
  }

  return(
    <div className={`${scss.page_container} flex-row-normal-center-none`}>
      <div className={scss.page_body}>
        <div className='flex-column-normal-normal-medium'>
          <div className='flex-column-normal-normal-medium'>
            <div className='flex-row-normal-normal-small'>
              <TextInput 
                name="workspace" 
                placeholder="Workspace path..." 
                value={newPathState?.workSpaces?.path  || ''} 
                onInput={(event) => getNewPathName(ExplorerConfiguratinsKeys.WORKSPACES, event)}/>
              <TextInput 
                name="workspace-alias" 
                placeholder='Workspace path alias...'
                value={newPathState?.workSpaces?.alias || ''}
                onInput={(event) => getNewPathAlias(ExplorerConfiguratinsKeys.WORKSPACES, event)}/>
            </div>
            <PreviewPaths explorer={Explorer} wichArray={ExplorerConfiguratinsKeys.WORKSPACES} title="Work Spaces"/>
            <button onClick={() => insertNewPath(ExplorerConfiguratinsKeys.WORKSPACES)} className={scss.page_insert_button}>Save</button>
          </div>
          <div className='flex-column-normal-normal-medium'>
            <div className='flex-row-normal-normal-small'>
              <TextInput 
                name="excludePathsWhenReadDirectories" 
                placeholder="Exclude path..." 
                value={newPathState?.excludePaths?.path || ''} 
                onInput={(event) => getNewPathName(ExplorerConfiguratinsKeys.EXCLUDE_PATHS, event)}/>
              <TextInput 
                name="excludePathsWhenReadDirectories-alias" 
                placeholder='Exclude path alias...'
                value={newPathState?.excludePaths?.alias || ''}
                onInput={(event) => getNewPathAlias(ExplorerConfiguratinsKeys.EXCLUDE_PATHS, event)}/>
            </div>
            <PreviewPaths explorer={Explorer} wichArray={ExplorerConfiguratinsKeys.EXCLUDE_PATHS} title="Exclude Path"/>
            <button onClick={() => insertNewPath(ExplorerConfiguratinsKeys.EXCLUDE_PATHS)} className={scss.page_insert_button}>Save</button>
          </div>
        </div>
      </div>
    </div>
  )
}