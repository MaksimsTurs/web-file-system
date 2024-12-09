import '@/scss/global.scss'

import type { FormWrapperProps } from "./wrapper.type";

export default function FormWrapper({ children, className, onSubmit }: FormWrapperProps) {
  return(
    <form onSubmit={onSubmit} className={`${className} flex-column-normal-normal-none`}>
      {children}
    </form>
  )
}