import type { Input } from "../input.type";
import type { FieldValues, UseFormRegister } from "react-hook-form";

export type TextAreaProps<T extends FieldValues> = {
  register?: UseFormRegister<T>
} & Omit<Input<T>, 'onInput'>