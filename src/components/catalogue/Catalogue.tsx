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
    <Box className="catalogue-box">
      {/* <IconButton className="catalogue-box__button" aria-label="ShowCatalogue" onClick={() => toggleCatalogue()}>
        <MenuIcon></MenuIcon>
      </IconButton> */}
      <Drawer
        anchor='left'
        open={isCatalogue}
        onClose={() => { toggleCatalogue() }}
      >
        <List sx={{ width: 300 }}>
          {catalogue?.map((item, index) => {
            return (
              <div>
                <ListItem key={index} sx={{ fontWeight: item.href === currentChapter ? 'bold' : 'normal', cursor: 'pointer' }} onClick={() => {
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
