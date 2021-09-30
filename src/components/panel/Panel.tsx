import "./index.less"
import { Toolbar, AppBar, Box, Typography } from '@mui/material';
import { IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import MoreIcon from '@mui/icons-material/MoreVert';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import DoubleArrowRoundedIcon from '@mui/icons-material/DoubleArrowRounded';

function Panel() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          {'Chapter'}
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
          <IconButton size="large" aria-label="search" color="inherit">
            <SearchIcon />
          </IconButton>
          <IconButton size="large" aria-label="fullscreen" color="inherit">
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

          <IconButton size="large" aria-label="hide" color="inherit" sx={{ transform: 'rotate(-90deg)' }}>
            <DoubleArrowRoundedIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Panel
