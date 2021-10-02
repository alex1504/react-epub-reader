import { useRef, useEffect, useState } from "react"
import Epub, { Book, EpubCFI, NavItem, Rendition } from "epubjs"
import useSearchDrawer from "./useSearchDrawer"
import useBookContent, { MatchSearches } from "./useBookContent"
import { IReaderProps } from "src/components/reader/Reader"
import useBookmarks, { addBookmarkFn, Bookmarks, removeBookmarkFn } from "./useBookmark"
import useBookmarkDrawer from "./useBookmarkDrawer"
import useSnackbar from "./useSnackbar"

export type BookContents = Array<{
  href: string,
  text: string[]
}>

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
  isSearchDrawer: boolean,
  bookContents: BookContents,
  initialFontSize: string,
  bookmarks: Bookmarks,
  currentCfi: string,
  isBookmarkDrawer: boolean,
  isSnackbar: boolean,
  snackbarMessage: string,
  toggleSearchDrawer: () => void,
  toggleCatalogue: () => void,
  setCurretChapter: (href: string) => void,
  searchBookContents: (searchString: string) => MatchSearches,
  addBookmark: addBookmarkFn,
  removeBookmark: removeBookmarkFn,
  toggleBookmarkDrawer: () => void,
  showToast: (message: string) => void
} | null

export interface ILocationChangeProps {
  end: string, href: string, index: number, percentage: number, start: string
}

function useEpubReader({ url, fontSize }: IReaderProps): EpubReaderState {
  if (!url) return null

  const { isSearchDrawer, toggleSearchDrawer } = useSearchDrawer()
  const { isBookmarkDrawer, toggleBookmarkDrawer } = useBookmarkDrawer()
  const contentViewRef = useRef<HTMLDivElement>(null)
  const catalogue = useRef<NavItem[] | null>(null)
  const rendition = useRef<Rendition | null>(null)
  const [isCatalogue, setCatalogue] = useState(false);
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)
  const [percentage, setPercentage] = useState(0)
  const [currentChapter, setCurretChapter] = useState('')
  const [currentCfi, setCurrentCfi] = useState('')
  const { isSnackbar, snackbarMessage, showToast } = useSnackbar()

  const toggleCatalogue = () => {
    setCatalogue(!isCatalogue)
  }

  const book = Epub(url);
  const initialFontSize = fontSize ? fontSize : '100%'

  const { bookContents, searchBookContents } = useBookContent(book)
  const { bookmarks, addBookmark, removeBookmark } = useBookmarks()

  const init = async () => {
    const { toc } = await book.loaded.navigation

    const node = contentViewRef.current as HTMLDivElement
    const width = window.getComputedStyle(node).getPropertyValue('width')
    const epubRendition = book.renderTo(node, { width, height: '100%' });
    const firstChapter = toc[0]

    setCurretChapter(firstChapter.href)
    setCurrentCfi(epubRendition.location?.start.cfi)

    catalogue.current = toc
    rendition.current = epubRendition

    epubRendition.themes.fontSize(initialFontSize);
    epubRendition.display(firstChapter.href);
    epubRendition.on('locationChanged', ({ percentage, href }: ILocationChangeProps) => {
      setCurretChapter(href)
      setPercentage(percentage)
      setCurrentCfi(epubRendition.location.start.cfi)
      setAtStart(epubRendition.location.atStart)
      setAtEnd(epubRendition.location.atEnd)
    })
  }

  useEffect(() => {
    init()
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
    isSearchDrawer,
    bookContents,
    initialFontSize,
    bookmarks,
    currentCfi,
    isBookmarkDrawer,
    isSnackbar,
    snackbarMessage,
    toggleSearchDrawer,
    toggleCatalogue,
    setCurretChapter,
    searchBookContents,
    addBookmark,
    removeBookmark,
    toggleBookmarkDrawer,
    showToast
  }
}

export default useEpubReader