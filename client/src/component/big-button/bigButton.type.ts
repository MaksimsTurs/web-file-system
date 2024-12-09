import type { PropsWithChildren, SyntheticEvent } from "react"

export type BigButtonProps = PropsWithChildren<{
  isDisabled?: boolean
  type?: 'submit' | 'button'
  className?: string
  onClick?: (event: SyntheticEvent<HTMLButtonElement>) => any
}>