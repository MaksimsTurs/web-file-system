import type { SyntheticEvent } from "react"
import type { FieldValues, Path, RegisterOptions } from "react-hook-form"

export type Input<T extends FieldValues> = {
  name: Path<T>
  placeholder?: string
  error?: string
  defaultValue?: string
  value?: string
  validation?: Pick<RegisterOptions<T>, 'max' | 'maxLength' | 'min' | 'minLength' | 'required'>
  onInput?: (event: SyntheticEvent<HTMLInputElement>) => any
}