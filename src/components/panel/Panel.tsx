import "./index.less"
import { useContext, useState } from "react";
import { Toolbar, AppBar, Box, Typography } from '@mui/material';
import { IconButton } from '@mui/material';
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
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import useSnackbar from "../../hooks/useSnackbar";

function Panel() {
  const context = useContext(readerContext)
  if (!context) return null

  const { isBookmarkDrawer: isSearchDrawer, toggleSearchDrawer, toggleCatalogue, rendition,
    initialFontSize, addBookmark, removeBookmark, currentCfi, bookmarks, toggleBookmarkDrawer, showToast } = context
  const [isPanelBar, setPanelBar] = useState(true)

  let fontSize = initialFontSize
  const isBookmarkAdded = bookmarks.find(bookmark => bookmark.cfi === currentCfi);

  const toggleFullScreen = async () => {
    if (!document.fullscreenElement) {
      await document.body.requestFullscreen()
    } else {
      await document.exitFullscreen()
    }
  }

  const hidePanelBar = () => {
    setPanelBar(false)
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

  return (
    <Box sx={{ flexGrow: 1 }}>
      <SearchDrawer></SearchDrawer>
      <BookmarkDrawer></BookmarkDrawer>

      <AppBar position="static" sx={{ display: isPanelBar ? 'block' : 'none' }}>

        <Toolbar variant="dense">
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={toggleCatalogue}>
            <MenuIcon />
          </IconButton>
          {'React Reader'}

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
    </Box>
  )
}

export default Panel
