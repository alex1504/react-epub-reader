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
    debugger
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
        const regExp = new RegExp(`(<[\w\d]+>)?.*(${searchText}).*<\/?[\w\d]+>`, 'ig')
        debugger
        body.innerHTML = body.innerHTML.replace(regExp, (match, sub1, sub2) => {
          return match.replace(sub2, `<mark>${sub2}</mark>`)
        })

        // const regExp = new RegExp(searchText, 'ig')
        // body.innerHTML = body.innerHTML.replace(paragraph, `<span class="highlight">${paragraph}</span>`)
        // body.innerHTML = body.innerHTML.replace(regExp, (match) => {
        //   return `<mark>${match}</mark>`
        // })
      }
    }

    setCurretChapter(href)
  }

  const handleKeyPress = (e: KeyboardEvent) => {
    const key = e.key
    if (key === 'Enter') {
      onSearchBookContents()
    }
  }

  return (
    <React.Fragment>
      <Drawer
        anchor='right'
        open={isSearchDrawer}
        onClose={toggleSearchDrawer}
      >
        <Paper
          sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', borderRadius: '0px' }}
        >
          {/* <IconButton sx={{ p: '10px' }} aria-label="menu">
            <MenuIcon />
          </IconButton> */}
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="search"
            inputProps={{ 'aria-label': 'search' }}
            onChange={onSearchTextChange}
            onKeyPress={handleKeyPress}
          />
          <IconButton type="submit" sx={{ p: '10px' }} aria-label="search" onClick={onSearchBookContents}>
            <SearchIcon />
          </IconButton>
        </Paper>


        <List
          sx={{ width: '400px', marginTop: 1, bgcolor: 'background.paper' }}
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader component="div" id="nested-list-subheader" sx={{ width: '100%' }}>
              Result：Total {matchSearches.length} Record
            </ListSubheader>
          }
        >
          {matchSearches.map(item => {
            return item ? <ListItemButton onClick={() => {
              onListItemClick(item.href, item.paragraph)
            }}>
              <ListItemText sx={{ height: '50px' }}>
                <p dangerouslySetInnerHTML={{ __html: item && item.paragraph ? item?.paragraph.replace(new RegExp(searchText, 'ig'), '<span class="highlight">' + searchText + '</span>') : '' }}></p>
              </ListItemText>
            </ListItemButton> : null
          })}
        </List>
      </Drawer>
    </React.Fragment >
  )
}

export default SearchDrawer
