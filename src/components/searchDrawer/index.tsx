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

import { readerContext } from "../reader/Reader"
import { SpineItem } from 'epubjs/types/section';

import { convert } from "html-to-text"
import { MatchSearches } from 'src/hooks/useBookContent';

function SearchDrawer() {
  const context = useContext(readerContext)
  if (!context) return null

  const { rendition, bookContents, searchBookContents, setCurretChapter } = context
  const [searchText, setSearchText] = useState('')
  const [matchSearches, setMatches] = useState<MatchSearches>([])

  const { isSearchDrawer, toggleSearchDrawer } = context

  const onSearchBookContents = async () => {
    const matches = searchBookContents(searchText)
    setMatches(matches)
  }

  const onSearchTextChange = (e) => {
    const value = e.target.value
    setSearchText(value)
  }

  const onListItemClick = async (href: string, paragraph: string) => {
    await rendition.current?.display(href)

    const win = document.querySelector("iframe")?.contentWindow
    if (win) {
      const body = win.document.documentElement.querySelector("body")
      if (body) {
        body.innerHTML = body.innerHTML.replace(paragraph, `<span style='color: red'>${paragraph}</span>`)
        body.innerHTML = body.innerHTML.replace(new RegExp(searchText, 'ig'), `<mark>${searchText}</mark>`)
      }
    }

    setCurretChapter(href)
  }

  return (
    <React.Fragment>
      <Drawer
        anchor='right'
        open={isSearchDrawer}
        onClose={toggleSearchDrawer}
      >
        <Paper
          sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
        >
          <IconButton sx={{ p: '10px' }} aria-label="menu">
            <MenuIcon />
          </IconButton>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="搜索"
            inputProps={{ 'aria-label': '搜索' }}
            onChange={onSearchTextChange}
          />
          <IconButton type="submit" sx={{ p: '10px' }} aria-label="search" onClick={onSearchBookContents}>
            <SearchIcon />
          </IconButton>
        </Paper>


        <List
          sx={{ width: '100%', marginTop: 1, bgcolor: 'background.paper' }}
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              找到结果：共{matchSearches.length}条记录
            </ListSubheader>
          }
        >
          {matchSearches.map(item => {
            return item ? <ListItemButton onClick={() => {
              onListItemClick(item.href, item.paragraph)
            }}>
              <ListItemText sx={{ height: '50px', width: '100px' }}>
                <p dangerouslySetInnerHTML={{ __html: item && item.paragraph ? item?.paragraph.replace(searchText, '<span style="color: red">' + searchText + '</span>') : '' }}></p>
              </ListItemText>
            </ListItemButton> : null
          })}
        </List>
      </Drawer>
    </React.Fragment >
  )
}

export default SearchDrawer
