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

function Panel() {
  const context = useContext(readerContext)
  if (!context) return null

  const { isSearchDrawer, toggleSearchDrawer } = context
  const [isPanelBar, setPanelBar] = useState(true)

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

  return (
    <Box sx={{ flexGrow: 1 }}>
      <SearchDrawer></SearchDrawer>

      <AppBar position="static" sx={{ display: isPanelBar ? 'block' : 'none' }}>

        <Toolbar variant="dense">
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
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

          <IconButton size="large" aria-label="bookmark-add" color="inherit">
            <BookmarkAddIcon />
          </IconButton>
          <IconButton size="large" aria-label="bookmark-added" color="inherit">
            <BookmarkAddedIcon />
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
