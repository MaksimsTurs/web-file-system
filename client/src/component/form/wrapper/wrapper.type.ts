import type { PropsWithChildren } from "react"

export type FormWrapperProps = PropsWithChildren<{
  onSubmit: (event: any) => any
  className?: string
}>