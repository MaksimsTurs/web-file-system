import type { FieldValues, UseFormRegister } from "react-hook-form"
import type { Input } from "../input.type"

export type TextInputProps<T extends FieldValues> = {
  register?: UseFormRegister<T>
  type?: 'text' | 'number'
  max?: number
  min?: number
} & Input<T>