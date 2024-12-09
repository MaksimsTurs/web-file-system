import scss from './globalErrorWrapper.module.scss'
import '@/scss/global.scss'

import { Fragment } from "react";

import type { PropsWithChildren } from 'react'
import type { ServerErrorResponse } from '@/global.type';

import useFileExplorer from '@/hooks/use-file-explorer/useFileExplorer.hook';

export default function GlobalErrorWrapper({ children }: PropsWithChildren) {
  const globalError: ServerErrorResponse | undefined = useFileExplorer().globalError

  return(
    <Fragment>
      {globalError ? 
      <div className={`flex-row-center-center-medium ${scss.global_error_container}`}>
        <div className='flex-column-normal-normal-none'>
          <p>Code - {globalError.code || 500}</p>
          <p>{globalError.message}</p>
        </div>
      </div> : children}
    </Fragment>
  )
}