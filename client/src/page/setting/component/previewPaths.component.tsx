import scss from '../scss/previewPaths.module.scss'
import '@/scss/global.scss'

import Button from '@/component/button/button.component'
import Empty from '@/component/empty/empty.component'

import type { PreviewPathProps } from '../page.type'

import { X } from 'lucide-react'

export default function PreviewPaths({ explorer, wichArray, title }: PreviewPathProps) {

  return(
    <div className={`${scss.preview_path_container} flex-column-normal-normal-medium`}>
      {title && <section className={scss.preview_path_container_header}>{title}</section>}
      {explorer.configurations[wichArray].length === 0 ?
      <Empty text='List ist empty!'/> : 
      explorer.configurations[wichArray].map(path => (
        <div key={typeof path === 'string' ? path : path.path} className='flex-row-center-space-between-medium'>
          <p>{typeof path === 'string' ? path : path.path}</p>
          <Button onClick={() => explorer.configurations.removePath({ fromArray: wichArray, value: typeof path === 'string' ? path : path.path })}><X strokeWidth={1}/></Button>
        </div>
      ))}
    </div>
  )
}