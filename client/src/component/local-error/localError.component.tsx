import scss from './localError.module.scss'
import '@/scss/global.scss'

import type { LocalErrorProps } from "./localError.type";

import { CircleX } from 'lucide-react';

export default function LocalError({ text }: LocalErrorProps) {
  return(
    <div className={`${scss.local_error_container} flex-row-center-normal-small`}>
      <CircleX strokeWidth={1}/>
      {text}
    </div>
  )
}