import scss from './bigButton.module.scss'
import '@/scss/global.scss'

import type { BigButtonProps } from './bigButton.type'

export default function BigButton({ isDisabled, children, className, ...props }: BigButtonProps) {
  const _isDisabled: boolean = typeof isDisabled === 'undefined' ? false : isDisabled
  return <button disabled={_isDisabled} className={`${scss.big_button} ${className} flex-row-center-center-medium`} {...props}>{children}</button>
}