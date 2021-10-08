import "./index.less"
import { ChangeEvent, useContext, useRef, useState } from "react";
import { Toolbar, AppBar, Box, Typography, Slide, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import MoreIcon from '@mui/icons-material/MoreVert';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import DoubleArrowRoundedIcon from '@mui/icons-material/DoubleArrowRounded';
import { readerContext } from "../reader/Reader"
import SearchDrawer from "../searchDrawer/index"
import BookmarkDrawer from "../bookmarkDrawer";
import FormatSizeOutlinedIcon from '@mui/icons-material/FormatSizeOutlined';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import FileReaderInput from 'react-file-reader-input'

function Panel() {
  const context = useContext(readerContext)
  if (!context) return null

  const { isBookmarkDrawer: isSearchDrawer, toggleSearchDrawer, toggleCatalogue, rendition,
    isPanelBar, setIsPanelBar,
    initialFontSize, addBookmark, removeBookmark, currentCfi, bookmarks, toggleBookmarkDrawer, showToast, setEbookUrl } = context

  const appbarRef = useRef<HTMLDivElement>(null)

  let fontSize = initialFontSize
  const isBookmarkAdded = bookmarks.find(bookmark => bookmark.cfi === currentCfi);

  const toggleFullScreen = async () => {
    if (!document.fullscreenElement) {
      await document.body.requestFullscreen()
    } else {
      await document.exitFullscreen()
    }
  }

  const resize = (isFullHeight: boolean) => {
    const originWidth = rendition.current?.settings.width
    const appbarH = appbarRef.current?.clientHeight
    if (!originWidth || !appbarH) {
      return
    }

    const height = isFullHeight ? window.innerHeight : window.innerHeight - appbarH

    if (typeof originWidth === 'number') {
      rendition.current?.resize(originWidth, height)
    } else {
      const nOriginWidth = originWidth.match(/\d+/)
      if (nOriginWidth) {
        rendition.current?.resize(Number(nOriginWidth[0]), height)
      }
    }
  }

  const hidePanelBar = () => {
    setIsPanelBar(false)
    resize(true)
  }

  const ShowPanelBar = () => {
    setIsPanelBar(true)
    resize(false)
  }

  const onAddBookmark = () => {
    addBookmark({
      name: 'bookmark',
      cfi: currentCfi
    })
    showToast('Add bookmark success')
  }

  const onRemoveBookmark = () => {
    removeBookmark(currentCfi)
    showToast('Remove bookmark success')
  }

  const toggleFontSize = () => {
    if (fontSize === '100%') {
      fontSize = '140%'
    } else {
      fontSize = '100%'
    }

    rendition.current?.themes.fontSize(fontSize)
  }

  const handleBookFileChange = (events: ChangeEvent<HTMLInputElement>, results: FileReaderInput.Result[]) => {
    if (!results.length) return

    const [e, file] = results[0]
    if (file.type !== 'application/epub+zip') {
      return showToast("Please choose an epub file")
    }

    const result = (e.target as FileReader)?.result as string
    setEbookUrl(result)

    events.target.setAttribute('value', '')
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <SearchDrawer></SearchDrawer>
      <BookmarkDrawer></BookmarkDrawer>

      <div className="right-fixed-box">
        <IconButton size="large" aria-label="hide" color="inherit" sx={{ transform: 'rotate(90deg)' }} onClick={ShowPanelBar}>
          <DoubleArrowRoundedIcon />
        </IconButton>
      </div>
      <Slide direction="down" in={isPanelBar} mountOnEnter unmountOnExit>
        <AppBar ref={appbarRef} className="appbar" position="static" sx={{ position: 'relative', zIndex: 3 }}>
          <Toolbar variant="dense">
            <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={toggleCatalogue}>
              <MenuIcon />
            </IconButton>
            {'EPUB READER'}

            {isSearchDrawer}

            <Typography
              variant="h5"
              noWrap
              component="div"
              sx={{ flexGrow: 1, alignSelf: 'flex-end' }}
            >
            </Typography>

            <IconButton size="large" aria-label="toggle-fontsize" color="inherit" onClick={toggleFontSize}>
              <FormatSizeOutlinedIcon />
            </IconButton>

            {isBookmarkAdded ?
              <IconButton size="large" aria-label="bookmark-added" color="inherit" onClick={onRemoveBookmark}>
                <BookmarkAddedIcon />
              </IconButton> :
              <IconButton size="large" aria-label="bookmark-add" color="inherit" onClick={onAddBookmark}>
                <BookmarkAddIcon />
              </IconButton>
            }
            <IconButton size="large" aria-label="bookmark-list" color="inherit" onClick={toggleBookmarkDrawer}>
              <FormatListBulletedOutlinedIcon />
            </IconButton>
            <IconButton size="large" aria-label="search" color="inherit" onClick={toggleSearchDrawer}>
              <SearchIcon />
            </IconButton>
            <IconButton size="large" aria-label="fullscreen" color="inherit" onClick={toggleFullScreen}>
              <FullscreenIcon />
            </IconButton>

            <FileReaderInput as="buffer" onChange={handleBookFileChange}>
              <IconButton size="large" aria-label="file-upload" color="inherit">
                <FileUploadIcon />
              </IconButton>
            </FileReaderInput>


            <IconButton
              size="large"
              aria-label="display more actions"
              edge="end"
              color="inherit"
            >
              <MoreIcon />
            </IconButton>

            <IconButton size="large" aria-label="hide" color="inherit" sx={{ transform: 'rotate(-90deg)' }} onClick={hidePanelBar}>
              <DoubleArrowRoundedIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Slide>

    </Box>
  )
}

export default Panel
