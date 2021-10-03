import React, { useContext, useState } from 'react';
import { Drawer, List, ListItem, ListItemText, Divider, ListSubheader, ListItemButton } from "@mui/material"
import { readerContext } from "../reader/Reader"

function BookmarkDrawer() {
  const context = useContext(readerContext)
  if (!context) return null

  const { rendition, bookmarks } = context

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
