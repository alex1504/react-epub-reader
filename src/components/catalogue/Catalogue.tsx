import "./index.less"
import { useContext } from "react";
import { Drawer, IconButton, List, ListItem, ListSubheader, Divider } from '@mui/material';
import { Box } from "@material-ui/system";
import MenuIcon from '@mui/icons-material/Menu';
import { readerContext } from "../reader/Reader"
import { NavItem } from "epubjs";

function Catalogue() {
  const context = useContext(readerContext)
  if (!context) return null

  const { isCatalogue, toggleCatalogue, catalogue, currentChapter, rendition } = context

  const handleCatalogChange = (catalogueItem: NavItem) => {
    rendition.current && rendition.current.display(catalogueItem.href)
    toggleCatalogue()
  }

  return (
    <Box className="catalogue-box" sx={{ width: 250 }}>
      <IconButton className="catalogue-box__button" aria-label="ShowCatalogue" onClick={() => toggleCatalogue()}>
        <MenuIcon></MenuIcon>
      </IconButton>
      <Drawer
        anchor='left'
        open={isCatalogue}
        onClose={() => { toggleCatalogue() }}
      >
        <List>

          {catalogue.current?.map((item, index) => {
            return index === 0 ? <ListSubheader>{item.label}</ListSubheader> : (
              <div>
                <ListItem sx={{ fontWeight: item.href === currentChapter ? 'bold' : 'normal' }} onClick={() => {
                  handleCatalogChange(item)
                }}>{item.label}</ListItem> <Divider />
              </div>
            )
          })}
        </List>
      </Drawer>
    </Box>

  )
}

export default Catalogue
