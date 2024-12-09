import type { FieldValues } from "react-hook-form"
import type { Input } from "../input.type"

export type UseSelectProps<T extends FieldValues> = {
  title?: string
  isMultiple?: boolean
  defaultValue?: string[]
} & Pick<Input<T>, 'placeholder'>