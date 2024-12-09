import { PropsWithChildren, SyntheticEvent } from "react";

export type ButtonProps = PropsWithChildren<{
  onClick?: (event: SyntheticEvent<HTMLButtonElement>) => any
  className?: string
}>