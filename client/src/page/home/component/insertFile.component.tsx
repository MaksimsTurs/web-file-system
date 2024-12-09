import scss from '../page.module.scss'
import '@/scss/global.scss'

import { useForm } from "react-hook-form";
import { Fragment } from 'react/jsx-runtime';
import { useState } from 'react';
import { CheckCircle } from 'lucide-react';

import FormWrapper from "@/component/form/wrapper/wrapper.component";
import BigButton from '@/component/big-button/bigButton.component';
import TextInput from "@/component/form/text-input/textInput.component";
import InsertedFileElement from './insertedFileElement.component';
import Empty from '@/component/empty/empty.component';
import LocalError from '@/component/local-error/localError.component';
import useSelect from "@/component/form/select-input/selectInput.component";
import TextArea from '@/component/form/text-area/textArea.component';

import useFileExplorer from '@/hooks/use-file-explorer/useFileExplorer.hook';

import { CREATE_FILE_OPTION } from '@/const';

// https://x.com/MaksimsTurs/status/1866168730201575663/photo/1
// https://x.com/i/status/1865669617890320787

export default function InsertFile() {
  const { reset, handleSubmit, register, getValues, watch } = useForm(),
        CreateFileOption = useSelect({ isMultiple: false, placeholder: 'Nothing selected', title: 'Select File creation option:' }),
        Explorer = useFileExplorer(),
        [fileURLs, setFileURL] = useState<string[]>([])

  const isSelectedDownloadFromURL: boolean = (CreateFileOption.selected.at(0) || CREATE_FILE_OPTION.SIMPLE_TEXT_FILE) === CREATE_FILE_OPTION.DOWNLOAD_FROM_URL,
        isSelectedSimpleTextFile: boolean = (CreateFileOption.selected.at(0) || CREATE_FILE_OPTION.DOWNLOAD_FROM_URL) === CREATE_FILE_OPTION.SIMPLE_TEXT_FILE,
        isButtonDisabled: boolean = 
          (isSelectedDownloadFromURL && fileURLs.length === 0) || 
          (isSelectedSimpleTextFile && (watch('name')?.length || 0) < 4) ||
          CreateFileOption.selected.length === 0

  const insertElement = (data: any) => {
    if(CreateFileOption.selected.at(0) === CREATE_FILE_OPTION.SIMPLE_TEXT_FILE) {
      delete data?.['url']
      Explorer.actions.insertSingleItem({...data, type: 'file'})
    }

    if(CreateFileOption.selected.at(0) === CREATE_FILE_OPTION.DOWNLOAD_FROM_URL) {
      Explorer.actions.downloadFilesFromURL(Explorer.actions.createDownloadData(data, fileURLs))
    }

    // reset()
  }

  const insertFileElementInToPreviewArray = () => {
    if(isSelectedDownloadFromURL) {
      setFileURL(prev => [...prev, getValues('url')])
      reset({ 'url': '' })
    }
  }

  return(
    <FormWrapper className='flex-column-normal-normal-medium' onSubmit={handleSubmit(insertElement)}>
      <CreateFileOption.List>
        <CreateFileOption.Item value={CREATE_FILE_OPTION.DOWNLOAD_FROM_URL}>Download from URL</CreateFileOption.Item>  
        <CreateFileOption.Item value={CREATE_FILE_OPTION.SIMPLE_TEXT_FILE}>Simple text File</CreateFileOption.Item>
        <CreateFileOption.Item value={CREATE_FILE_OPTION.FROM_FILE_SYSTEM}>From file system</CreateFileOption.Item>
      </CreateFileOption.List>
      {isSelectedDownloadFromURL ?
      <Fragment>
        <TextInput name='url' register={register} placeholder='Add file URL to Downlaod and Configure'/>
        {Explorer.localError && <LocalError text={Explorer.localError}/>}
        <BigButton onClick={insertFileElementInToPreviewArray} type='button'>Insert URL</BigButton>
        <div className={`${scss.preview_inserted_elements_container} flex-column-normal-normal-small`}>
          {fileURLs.length === 0 ? <Empty text='List of URLs ist empty!'/> : fileURLs.map((item, index) => <InsertedFileElement key={item} index={index} item={item} register={register} setFileURL={setFileURL}/>)}
        </div>
      </Fragment> :
      isSelectedSimpleTextFile ?
      <Fragment>
        <TextInput name='name' register={register} placeholder='Add file name (with extention!)'/>
        <TextArea name='content' register={register} placeholder='File content'/>
      </Fragment> : null}
      <BigButton isDisabled={isButtonDisabled}>
        <CheckCircle/>
        <p>Insert File</p>
      </BigButton>
    </FormWrapper>
  )
}