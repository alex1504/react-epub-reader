import './index.less'
import Epub from "epubjs"
import { useEffect, useRef, useContext } from 'react';
import { readerContext } from "../reader/Reader"
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

// TEST_URL:  https://gerhardsletten.github.io/react-reader/files/alice.epub

function ContentView() {
  const context = useContext(readerContext)
  if (!context) return null

  const { rendition, atStart, atEnd } = context

  const goPrevPage = () => {
    rendition.current && rendition.current.prev()
  }

  const goNextPage = () => {
    console.log('next')
    rendition.current && rendition.current.next()
  }

  return (
    <div className="content-view" >
      <div className="content-view__pagination" onClick={goPrevPage}>
        <ArrowBackIosIcon color={atStart ? 'disabled' : undefined}></ArrowBackIosIcon>
      </div>
      <div className="content-view__book" ref={context.contentViewRef}></div>
      <div className="content-view__pagination" onClick={goNextPage}>
        <ArrowForwardIosIcon color={atEnd ? 'disabled' : undefined} ></ArrowForwardIosIcon>
      </div>
    </div >
  )
}

export default ContentView
