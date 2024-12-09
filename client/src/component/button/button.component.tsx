import scss from './button.module.scss'

import { ButtonProps } from "./button.type";

export default function Button({ children, className, onClick }: ButtonProps) {
  return <button onClick={onClick} className={`${scss.button} ${className} flex-row-center-center-none`} type='button'>{children}</button>
}