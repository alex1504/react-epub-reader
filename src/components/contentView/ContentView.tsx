import './index.less'
import Epub from "epubjs"
import React, { useEffect } from 'react';

// TEST_URL:  https://gerhardsletten.github.io/react-reader/files/alice.epub

function ContentView() {
  const contentViewRef: any = React.createRef()
  const url = './alice.epub'

  useEffect(() => {
    console.log('useEffect')

    const book = Epub(url);
    book.loaded.navigation.then(({ toc }) => {
      debugger
      const node = contentViewRef.current
      const rendition = book.renderTo(node, { width: '100%', height: '100%' });


      rendition.display();
    })
  });

  return (
    <div className="content-view" ref={contentViewRef}>
    </div>
  )
}

export default ContentView
