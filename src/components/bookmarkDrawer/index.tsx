import React, { useContext, useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
import ListSubheader from '@mui/material/ListSubheader';
import ListItemButton from '@mui/material/ListItemButton';
import Collapse from '@mui/material/Collapse';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import Typography from '@mui/material/Typography';

import { readerContext } from "../reader/Reader"
import { SpineItem } from 'epubjs/types/section';

import { convert } from "html-to-text"
import { MatchSearches } from 'src/hooks/useBookContent';

function BookmarkDrawer() {
  const context = useContext(readerContext)
  if (!context) return null

  const { rendition, bookContents, searchBookContents, bookmarks } = context

  const { isBookmarkDrawer, toggleBookmarkDrawer } = context

  const goToBookmark = (cfi: string) => {
    rendition.current?.display(cfi)
  }

  return (
    <React.Fragment>
      <Drawer
        anchor='right'
        open={isBookmarkDrawer}
        onClose={toggleBookmarkDrawer}
      >
        <List sx={{ width: '300px', maxWidth: 360, bgcolor: 'background.paper' }} subheader={<ListSubheader>Bookmarks</ListSubheader>}>
          {
            bookmarks.map(bookmark => (
              <ListItemButton key={bookmark.cfi} onClick={() => {
                goToBookmark(bookmark.cfi)
              }}>
                <ListItem alignItems="flex-start">
                  <ListItemText
                    primary={bookmark.name}
                    secondary={
                      <React.Fragment>
                        {bookmark.time}
                      </React.Fragment>
                    }
                  />
                </ListItem>
                <Divider component="li" />
              </ListItemButton>
            ))
          }
        </List>
      </Drawer>
    </React.Fragment >
  )
}

export default BookmarkDrawer
