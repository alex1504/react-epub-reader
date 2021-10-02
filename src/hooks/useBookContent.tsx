import { Book } from "epubjs";
import { convert } from "html-to-text"
import { useEffect, useMemo, useState } from "react";
import { BookContents } from "./useEpubReader";

export type MatchSearches = Array<{
  paragraph: string,
  href: string
} | undefined>

function useBookContent(book: Book) {
  const [bookContents, setBookContents] = useState<BookContents>([])

  const getBookContents = async () => {
    const spine = await book.loaded.spine
    const contents: BookContents = []

    for (let item of (spine as any).items) {
      if (!item.href) return

      const doc = await book.load(item.href)
      const innerHTML = (doc as Document).documentElement.innerHTML
      const innerText = convert(innerHTML)

      contents.push({
        href: item.href,
        text: innerText.split(/\n+/)
      })
    }

    setBookContents(contents)
  }

  const searchText = (searchString: string): MatchSearches => {
    const regexp = new RegExp(searchString, 'ig')

    let res: MatchSearches = []
    for (let content of bookContents) {
      for (let paragraph of content.text) {
        if (paragraph.match(regexp) !== null) {
          res.push({
            paragraph,
            href: content.href
          })
        }
      }
    }

    return res
  }

  useEffect(() => {
    getBookContents()
  }, [])

  return {
    bookContents,
    searchBookContents: searchText
  }
}

export default useBookContent