import React, { ChangeEventHandler, KeyboardEventHandler, SyntheticEvent, useContext, useState } from 'react';
import { Drawer, List, ListItemText, Paper, InputBase, IconButton, ListSubheader, ListItemButton } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';
import { readerContext } from "../reader/Reader"
import { MatchSearches } from 'src/hooks/useBookContent';

function SearchDrawer() {
  const context = useContext(readerContext)
  if (!context) return null

  const { rendition, searchBookContents, setCurretChapter } = context
  const [searchText, setSearchText] = useState('')
  const [matchSearches, setMatches] = useState<MatchSearches>([])

  const { isSearchDrawer, toggleSearchDrawer } = context

  const onSearchBookContents = async () => {
    const matches = searchBookContents(searchText)
    setMatches(matches)
  }

  const onSearchTextChange: ChangeEventHandler<HTMLInputElement> = (e) => {
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

  const handleKeyPress: KeyboardEventHandler<HTMLInputElement> = (e) => {
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
          {matchSearches.map((item, index) => {
            return item ? <ListItemButton onClick={() => {
              onListItemClick(item.href, item.paragraph)
            }}>
              <ListItemText key={index} sx={{ height: '50px' }}>
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
