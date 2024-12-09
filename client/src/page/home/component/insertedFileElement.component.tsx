import scss from '../scss/insertedFileElement.module.scss'

import { SettingsIcon, X } from 'lucide-react';
import { Fragment, useState } from 'react';

import Button from '@/component/button/button.component';
import TextInput from '@/component/form/text-input/textInput.component';

import { IMG_EXTENTIONS } from '@/const';

import Strings from '@/util/Strings/Strings.util';

import type { InsertedElementProps } from '../page.type';
import type { FileExplorer } from '@/store/file-explorer/fileExplorer.type';

export default function InsertedFileElement({ item, index, register, setFileURL }: InsertedElementProps) {
  const [isConfigurationsModalOpen, setIsConfigurationsModalOpen] = useState<boolean>(false)

  const configurationModalAction = (value: boolean) => {
    setIsConfigurationsModalOpen(value)
  }

  const removeFromList = (item: string | FileExplorer) => {
    setFileURL(prev => prev.filter(prevItem => prevItem !== item))
  }

  return(
    <Fragment>
      <div className={`${isConfigurationsModalOpen ? '' : scss.preview_inserted_item_configurations_container_hidden} ${scss.preview_inserted_item_configurations_container} flex-row-center-center-none`}>
        <div className={`${scss.preview_inserted_item_configurations_body} flex-column-normal-normal-small`}>
          <div className={`${scss.prev_inserted_item_header} flex-row-center-space-between-medium`}>
            <p>File compression configuration</p>
            <Button onClick={() => configurationModalAction(false)}><X strokeWidth={1}/></Button>
          </div>
          <TextInput 
            name={`${index}-name`}
            type='text' 
            register={register}
            placeholder='Rename, default if nothing passed'/>
          <TextInput 
            name={`${index}-compress`}
            type='number' 
            register={register}
            placeholder='Compress value (in %)'
            max={100}
            min={0}/>
          <div className='flex-row-normal-normal-small'>
            <TextInput 
              name={`${index}-resize-x`}
              type='number' 
              register={register}
              placeholder='Width, 100% from Original if nothing passed'/>
            <TextInput 
              name={`${index}-resize-y`}
              type='number' 
              register={register}
              placeholder='Height, 100% from Original if nothing passed'/>
            </div>
            <div className='flex-row-center-center-none'>
              {IMG_EXTENTIONS.includes(Strings.getFileExtention(item)) && <img className={scss.preview_inserted_preview} src={item}/>}
            </div>
        </div>
      </div>
      <div className={`${scss.preview_inserted_item} flex-row-center-space-between-medium`} key={item}>
        <p>{item}</p>
        <div className='flex-row-normal-normal-small'>
          <Button onClick={() => configurationModalAction(true)}><SettingsIcon strokeWidth={1}/></Button>
          <Button onClick={() => removeFromList(item)}><X strokeWidth={1}/></Button>
        </div>
      </div>
    </Fragment>
  )
}