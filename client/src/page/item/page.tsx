import scss from './page.module.scss'
import '@/scss/global.scss'

import useFileExplorer from '@/hooks/use-file-explorer/useFileExplorer.hook'

import ItemInformationMenu from "./component/itemInformationMenu.component"
import ItemEditForm from './component/itemEditForm.component'

import { useParams } from "react-router-dom"

export default function Page() {
  const params = useParams(),
        item = useFileExplorer().getItem(params.path),
        fileSourceURL: string = `http://localhost:4000/asset?url=${item?.fullPath}`
      
  const isImage: boolean = /(webp|png|jpeg|jpg)/.test(item?.fullPath || ''),
        isVideo: boolean = /(mp4|MP4)/.test(item?.fullPath || '')
  
  return(
    <div className={`${scss.item_page_preview_container} flex-row-normal-normal-small`}>
      <ItemInformationMenu item={item!}/>
      {isImage || isVideo ?
      <div className={`${scss.item_page_preview_container} flex-row-center-center-none`}>
        {isImage ? <img className={scss.item_page_preview_media} src={fileSourceURL}/> :
        isVideo ? <video className={scss.item_page_preview_media} src={fileSourceURL} controls/> : null}
      </div> : null}
      <ItemEditForm item={item!}/>
    </div>
  )
}