import scss from './textInput.module.scss'
import '@/scss/global.scss'

import type { TextInputProps } from "./textInput.type";
import type { FieldValues } from 'react-hook-form';

import { CircleX } from 'lucide-react';

export default function TextInput<T extends FieldValues>({ error, validation, register, ...props }: TextInputProps<T>) {
  const inputProps = {...props, ...register?.(props.name, validation) }

  return(
    <div style={{ width: '100%' }} className='flex-column-normal-normal-medium'>
      <input className={scss.text_input} type="text" {...inputProps }/>
      {error && <div className={`${scss.text_input_error} flex-row-center-normal-small`}><CircleX/><p>{error}</p></div>}
    </div>
  )
}