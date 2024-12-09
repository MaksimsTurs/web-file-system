import type { PropsWithChildren } from "react";

import { BrowserRouter } from "react-router-dom";

export default function BrowserRouterWrapper({ children }: PropsWithChildren) {
  return <BrowserRouter>{children}</BrowserRouter>
}