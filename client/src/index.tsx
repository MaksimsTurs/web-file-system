import "@/scss/root.scss"

import { createRoot } from "react-dom/client"
import { Route, Routes } from "react-router-dom"
import { Fragment, lazy, Suspense } from 'react'

import Header from "./component/header/header.component.tsx"
import ContextMenu from "./component/context-menu/contextMenu.component.tsx"

import ReduxWrapper from "./component/wrapper/redux.component.tsx"
import BrowserRouterWrapper from "./component/wrapper/browserRouter.component.tsx"
import GlobalErrorWrapper from "./component/wrapper/global-error-wrapper/globalError.component.tsx"

import Fetcher from "./util/Fetcher/Fetcher.util.ts"

import useFileExplorer from "./hooks/use-file-explorer/useFileExplorer.hook.ts"

const Home = lazy(() => import('./page/home/page.tsx')),
      Setting = lazy(() => import('./page/setting/page.tsx')),
      Item = lazy(() => import('./page/item/page.tsx'))

const App = () => {
  Fetcher.base = 'http://localhost:4000'
  useFileExplorer().configurations.initializeWorkSpaces()

  return(
    <Fragment>
      <Header/>
      <ContextMenu>
        <GlobalErrorWrapper>
          <Routes>
            <Route path="/" element={<Suspense fallback={'...Loading'}><Home/></Suspense>}/>
            <Route path="/setting" element={<Suspense fallback={'...Loading'}><Setting/></Suspense>}/>
            <Route path="/item/:path" element={<Suspense fallback={'...Loading'}><Item/></Suspense>}/>
          </Routes>
        </GlobalErrorWrapper>
      </ContextMenu>
    </Fragment>
  )
}

createRoot(document.getElementById("root") as HTMLElement).render(
  <ReduxWrapper>
    <BrowserRouterWrapper>
      <App/>
    </BrowserRouterWrapper>
  </ReduxWrapper>
)