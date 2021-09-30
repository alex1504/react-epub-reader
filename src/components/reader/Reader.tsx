import React, { useEffect } from "react"
import Catalogue from "../catalogue/Catalogue"
import ContentView from "../contentView/ContentView"
import Panel from "../panel/Panel"
import useEpubReader, { EpubReaderState } from "../../hooks/useEpubReader"

export interface IReaderProps {
  url: string
}

export const readerContext = React.createContext<EpubReaderState>(null)

function Reader(props: IReaderProps) {
  const epubReaderState = useEpubReader(props.url)

  return (
    <readerContext.Provider value={epubReaderState}>
      <Panel></Panel>
      <Catalogue></Catalogue>
      <ContentView></ContentView>
    </readerContext.Provider>

  )
}

export default Reader
