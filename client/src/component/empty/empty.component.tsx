import scss from './empty.module.scss'
import '@/scss/global.scss'

import type { EmptyProps } from "./empty.type";

import { ClipboardList } from 'lucide-react';

export default function Empty({ text }: EmptyProps) {
  return(
    <div className={`${scss.empty_container} flex-row-center-normal-medium`}>
      <ClipboardList strokeWidth={1}/>
      {text}
    </div>
  )
}