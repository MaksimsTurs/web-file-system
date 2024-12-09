import scss from '../scss/itemEditForm.module.scss'

import type { ItemEditFormProps } from "../page.type";

import { MEDIA_FILE_EXTENTIONS_REGEXP, VIDEO_EXTENTIONS } from "@/const";

import FormWrapper from "@/component/form/wrapper/wrapper.component";
import TextInput from "@/component/form/text-input/textInput.component";
import BigButton from '@/component/big-button/bigButton.component';
import TextArea from '@/component/form/text-area/textArea.component';

import { useForm } from "react-hook-form";
import { Fragment } from "react/jsx-runtime";

import useFileExplorer from '@/hooks/use-file-explorer/useFileExplorer.hook';

import Strings from '@/util/Strings/Strings.util';

export default function ItemEditForm({ item }: ItemEditFormProps) {
  const { register, reset, handleSubmit } = useForm(),
        Explorer = useFileExplorer(),
        isMediaFile: boolean = MEDIA_FILE_EXTENTIONS_REGEXP.test(item.name),
        isVideoFile: boolean = VIDEO_EXTENTIONS.includes(Strings.getFileExtention(item.name))

  const editItem = (data: any) => {
    const x = parseInt(data['resize-x']) || null,
          y = parseInt(data['resize-y']) || null,
          resize: [number | null, number | null] | undefined = (x && y) ? [x, y] : undefined,
          compress: number | undefined = data.compress || undefined,
          name: string | undefined = data.name || undefined

    if(isMediaFile) {      
      delete data['resize-x']
      delete data['resize-y']

      Explorer.actions.editMediaFile({ name, compress, resize, fullPath: item.fullPath })
    } else {
      Explorer.actions.editTextFile({ name, fullPath: item.fullPath })
    }

    reset()
  }

  const removeFile = () => {
    Explorer.actions.deleteItemFrom(item.fullPath)
  }

  return(
    <FormWrapper className={scss.item_edit_form} onSubmit={handleSubmit(editItem)}>
      {isMediaFile ?
      <Fragment>
        <TextInput 
          name='name'
          type='text' 
          register={register}
          placeholder='Rename, default if nothing passed'/>
        <TextInput 
          name='compress'
          type='number' 
          register={register}
          placeholder='Compress value (in %)'
          max={100}
          min={0}/>
        {!isVideoFile && 
        <div className='flex-row-normal-normal-small'>
          <TextInput 
            name='resize-x'
            type='number' 
            register={register}
            placeholder='Width, 100% from Original if nothing passed'/>
          <TextInput 
            name='resize-y'
            type='number' 
            register={register}
            placeholder='Height, 100% from Original if nothing passed'/>
        </div>}
      </Fragment> : 
      <Fragment>
        <TextInput 
          name='name'
          type='text' 
          register={register}
          placeholder='Rename, default if nothing passed'/>
        <TextArea 
          name='content' 
          defaultValue={item.content} 
          placeholder='Content' 
          register={register}/>
      </Fragment>}
      <div className='flex-row-center-normal-small'>
        <BigButton>Änderungen speichern</BigButton>
        <BigButton className={scss.item_remove_button} type='button' onClick={removeFile}>Löschen</BigButton>
      </div>
    </FormWrapper>
  )
}