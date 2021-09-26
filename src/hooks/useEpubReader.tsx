import { useRef, useEffect, useState } from "react"
import Epub, { Book, NavItem, Rendition } from "epubjs"

export type EpubReaderState = {
  url: string,
  book: Book,
  catalogue: React.MutableRefObject<NavItem[] | null>,
  rendition: React.MutableRefObject<Rendition | null>,
  contentViewRef: React.RefObject<HTMLDivElement>,
  isCatalogue: boolean,
  percentage: number,
  atStart: boolean,
  atEnd: boolean,
  currentChapter: string,
  toggleCatalogue: () => void
} | null

export interface ILocationChangeProps {
  end: string, href: string, index: number, percentage: number, start: string
}

function useEpubReader(url: string): EpubReaderState {
  if (!url) return null

  const contentViewRef = useRef<HTMLDivElement>(null)
  const catalogue = useRef<NavItem[] | null>(null)
  const rendition = useRef<Rendition | null>(null)
  const [isCatalogue, setCatalogue] = useState(false);
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)
  const [percentage, setPercentage] = useState(0)
  const [currentChapter, setCurretChapter] = useState('')

  const toggleCatalogue = () => {
    setCatalogue(!isCatalogue)
  }

  const book = Epub(url);

  useEffect(() => {
    console.log('useEffect')

    book.loaded.navigation.then(({ toc }) => {
      const node = contentViewRef.current as HTMLDivElement
      const width = window.getComputedStyle(node).getPropertyValue('width')
      const epubRendition = book.renderTo(node, { width, height: '100%' });
      const firstChapter = toc[0]

      console.log(book)
      console.log(epubRendition)

      setCurretChapter(firstChapter.href)

      catalogue.current = toc
      rendition.current = epubRendition

      epubRendition.display(firstChapter.href);
      epubRendition.on('locationChanged', ({ percentage, href }: ILocationChangeProps) => {
        setCurretChapter(href)
        setPercentage(percentage)
        setAtStart(epubRendition.location.atStart)
        setAtEnd(epubRendition.location.atEnd)
      })
    })
  }, [url]);

  return {
    url,
    book,
    catalogue,
    isCatalogue,
    rendition,
    contentViewRef,
    percentage,
    atStart,
    atEnd,
    currentChapter,
    toggleCatalogue,
  }
}

export default useEpubReader