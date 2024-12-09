import type { Dispatch, SetStateAction } from "react"
import type { UseFormRegister } from "react-hook-form"

export type InsertedElementProps = {
  item: string
  index: number
  register: UseFormRegister<any>
  setFileURL: Dispatch<SetStateAction<string[]>>
}