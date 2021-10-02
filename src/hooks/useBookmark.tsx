import { useState } from "react";
import { getCurLocaleTime } from "../utils";

export type BookmarkItem = {
  name: string,
  cfi: string,
  time: string
}

export type Bookmarks = Array<BookmarkItem>

export interface addBookmarkFn {
  (bookmark: Pick<BookmarkItem, Exclude<keyof BookmarkItem, 'time'>>): void
}

export interface removeBookmarkFn {
  (cfi: string): void
}

export default function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<Bookmarks>([])

  const addBookmark: addBookmarkFn = (bookmark) => {
    const bookmarkWithTime = {
      ...bookmark,
      time: getCurLocaleTime()
    }

    setBookmarks([
      ...bookmarks,
      bookmarkWithTime,
    ])
  }

  const removeBookmark = (cfi: string) => {
    const bookmarksFilter = bookmarks.filter(bookmark => bookmark.cfi !== cfi)
    setBookmarks(bookmarksFilter)
  }

  return {
    bookmarks,
    addBookmark,
    removeBookmark
  }
}