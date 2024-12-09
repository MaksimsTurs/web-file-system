import scss from './textArea.module.scss'

import type { FieldValues } from "react-hook-form";
import type { TextAreaProps } from "./textArea.type";

export default function TextArea<T extends FieldValues>({ error, validation, register, ...props }: TextAreaProps<T>) {
  const textAreaProps = {...props, ...register?.(props.name, validation) }
  return <textarea className={scss.text_area} {...textAreaProps }></textarea>
}