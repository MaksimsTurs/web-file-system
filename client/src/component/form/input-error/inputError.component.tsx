import scss from './inputError.module.scss'
import '@/scss/global.scss'

import { CircleX } from 'lucide-react'
import { Fragment } from "react/jsx-runtime"

import type { InputErrorProps } from "./inputError.type"

export default function InputError({ error }: InputErrorProps) {
  return <Fragment>{error && <div className={`${scss.input_error} flex-row-center-normal-small`}><CircleX/><p>{error}</p></div>}</Fragment>
}